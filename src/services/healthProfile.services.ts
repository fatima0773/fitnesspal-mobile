import axios from 'axios';
import {API_URL} from '../config/config';
import storage from '../utility/Storage';

export const createHealthProfile = async ({
  weight,
  height,
  bmi,
  diseases,
  disabilities,
  subdiseases,
  subdisabilities,
  targetWeight,
  toningAreas,
  age,
  gender,
  isPound,
}: {
  weight: number;
  height: number;
  bmi: number;
  diseases: [string];
  disabilities: [string];
  subdiseases: [string];
  subdisabilities: [string];
  targetWeight: number;
  toningAreas: [string];
  age: number;
  gender: string;
  isPound: boolean;
}) => {
  const auth = await storage.load({
    key: 'authState',
    autoSync: true,
    syncInBackground: true,
  });
  const userId = auth.userId;
  console.log({
    userId,
    weight,
    height,
    bmi,
    diseases,
    disabilities,
    subdiseases,
    subdisabilities,
    targetWeight,
    toningAreas,
    age,
    gender,
    isPound,
  });
  try {
    const response = await axios.post(
      `${API_URL}health-profile/create-profile`,
      {
        userId,
        weight,
        height,
        bmi,
        diseases,
        disabilities,
        subdiseases,
        subdisabilities,
        targetWeight,
        toningAreas,
        age,
        gender,
        isPound,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createNutritionalProfile = async () => {
  const auth = await storage.load({
    key: 'authState',
    autoSync: true,
    syncInBackground: true,
  });
  const userId = auth.userId;
  try {
    const response = await axios.post(
      `${API_URL}nutritional-profile/create-profile`,
      {
        userId,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAgeAndGender = async ({
  age,
  gender,
}: {
  age: number;
  gender: string;
}) => {
  const auth = await storage.load({
    key: 'authState',
    autoSync: true,
    syncInBackground: true,
  });
  const userId = auth.userId;
  console.log({
    userId,
    age,
    gender,
  });
  try {
    const response = await axios.put(`${API_URL}user/update-profile`, {
      userId,
      age,
      gender,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
