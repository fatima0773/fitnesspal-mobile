import axios from 'axios';
import {API_URL} from '../config/config';
import storage from '../utility/Storage';
export const generateMealPlan = async (health: any, diet: any) => {
  const auth = await storage.load({
    key: 'authState',
    autoSync: true,
    syncInBackground: true,
  });
  const userId = auth.userId;
  try {
    const response = await axios.post(`${API_URL}meal-plan/generate`, {
      userId,
      plan: 7,
      health: health,
      calories: {
        min: 1800,
        max: 2900,
      },
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      diet: diet,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
