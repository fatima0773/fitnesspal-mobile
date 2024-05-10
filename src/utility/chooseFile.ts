import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

export const chooseFile = (
  type: any,
  numberOfPhotos: number,
  callback: (uris: string[]) => void,
) => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 300,
    quality: 1,
    presentationStyle: 'popover',
    selection: numberOfPhotos,
    selectionLimit: numberOfPhotos,
    // base64: true,
  };

  launchImageLibrary(options, (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled camera picker');
    } else if (response.errorCode === 'camera_unavailable') {
      console.log('Camera not available on device');
    } else if (response.errorCode === 'permission') {
      console.log('Permission not satisfied');
    } else if (response.errorCode === 'others') {
      console.log(response.errorMessage);
    } else if (response.assets !== undefined) {
      const imageUris = response.assets.map(asset => asset);
      callback(imageUris);
    }
  });
};
