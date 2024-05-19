// Axois Import
import axios from 'axios';

// Cookies Import
// import Cookies from 'js-cookie';
import {API_URL} from '../config/config';
import storage from '../utility/Storage';

/**
 * Sends OTP to user's email before registering a user
 * @param email - The user's email address
 * @returns Response from the server
 */
export const sendOtp = async ({email}: {email: string}) => {
  try {
    // Send a POST request to send OTP
    const response = await axios.post(`${API_URL}user/send-signup-otp`, {
      email,
    });

    // Set the token cookie with a 7-day expiry
    // Cookies.set('token', response.data.result.token, {expires: 7});
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Registers a user on providing valid OTP
 * @param email - The user's email address
 * @param password - The user's password
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @param emailOtp - The OTP received on the user's email
 * @returns Response from the server
 */
export const registerUser = async ({
  email,
  password,
  name,
  otp,
}: {
  email: string;
  password: string;
  name: string;
  otp: string;
}) => {
  try {
    // Send a POST request to register the user
    const response = await axios.post(`${API_URL}user/signup`, {
      email,
      password,
      name,
      otp,
      age: -1,
      gender: 'NA',
    });

    // console.log(response.data.userId);
    // Cookies.set('token', response.data.result.token, { expires: 7 });
    storage.save({
      key: 'authState',
      data: {
        userId: response.data.userId,
      },
    });

    // Cookies.set('authState', 'signedIn');
    // Cookies.set('userId', response.data.userId);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Signs the user in using email and password with a valid token
 * @param email - The user's email address
 * @param password - The user's password
 * @returns Response from the server
 */
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Get the user's token from the cookie
    // const userToken = Cookies.get('token');
    // storage.save({
    //   key: 'signedIn',
    //   data: {
    //     userId: response.data.userId,
    //   },
    // });

    // const ret = await storage.load({
    //   key: 'loginState',
    //   autoSync: true,
    //   syncInBackground: true,
    // });
    // console.log(ret);

    // Send a POST request to sign the user in
    const response = await axios.post(`${API_URL}user/signin`, {
      email,
      password,
    });
    // Cookies.set('authState', 'signedIn');
    // Cookies.set('userId', response.data.userId);
    storage.save({
      key: 'authState',
      data: {
        userId: response.data.userId,
      },
    });
    console.log(response.data.userId);
    console.log('djskjds');
    // console.log(response.message);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Sends Reset Password OTP to the user's email
 * @param email - The user's email address
 * @returns Response from the server
 */
export const sendResetPassOtp = async ({email}: {email: string}) => {
  try {
    // Get the user's token from the cookie
    // const userToken = Cookies.get('token');

    // Send a POST request to send Reset Password OTP
    const response = await axios.post(`${API_URL}user/reset-password-otp`, {
      email,
      // token: userToken,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Resets the user's password on providing a valid OTP and token
 * @param email - The user's email address
 * @param newPassword - The new password to be set
 * @param resetPassOtp - The OTP received for resetting password
 * @returns Response from the server
 */
export const resetPassword = async ({
  email,
  newPassword,
  otp,
}: {
  email: string;
  newPassword: string;
  otp: string;
}) => {
  try {
    // Get the user's token from the cookie
    const response = await axios.post(`${API_URL}user/reset-password`, {
      email,
      newPassword,
      otp: otp,
    });
    console.log('response: ', response);
    return response;
  } catch (error) {
    throw error;
  }
};
