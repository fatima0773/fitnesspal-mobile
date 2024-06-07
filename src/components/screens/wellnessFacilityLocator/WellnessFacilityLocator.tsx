/* eslint-disable @typescript-eslint/no-shadow */
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import React from 'react';

const WellnessFacilityLocator = () => {
  const [region, setRegion] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [places, setPlaces] = useState<any>({
    healthcare: [],
    dieticians: [],
    parks: [],
    trails: [],
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setError('Location permission denied');
          setLoading(false);
        }
      } catch (err) {
        console.error('Location permission error:', err);
        setError('Error requesting location permission');
        setLoading(false);
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const currentRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(currentRegion);
          fetchNearbyPlaces(latitude, longitude);
          setLoading(false);
        },
        error => {
          console.error('Error getting location:', error);
          setError(`Error getting location: ${error.message}`);
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 1500000, maximumAge: 10000},
      );
    };

    const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
      const placeTypes = ['hospital', 'dietitian', 'park', 'trail'];
      const promises = placeTypes.map(type =>
        axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=${type}&key=AIzaSyBfBHArwvW8-iMXSBPr0FuHhba924pzuf8`,
        ),
      );

      try {
        const results = await Promise.all(promises);
        setPlaces({
          healthcare: results[0].data.results,
          dieticians: results[1].data.results,
          parks: results[2].data.results,
          trails: results[3].data.results,
        });
      } catch (err) {
        console.error('Error fetching places:', err);
        setError('Error fetching places');
      }
    };

    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        mapType={Platform.OS === 'android' ? 'none' : 'standard'}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={region => setRegion(region)}>
        {places.healthcare.map((place: any) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
            pinColor="red"
          />
        ))}
        {places.dieticians.map((place: any) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
            pinColor="blue"
          />
        ))}
        {places.parks.map((place: any) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
            pinColor="green"
          />
        ))}
        {places.trails.map((place: any) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
            pinColor="orange"
          />
        ))}
      </MapView>
      <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default WellnessFacilityLocator;
