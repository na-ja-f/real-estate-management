import { apiCall } from "./apiCalls";
import { userUrls } from "./endpoints";
import { FormValues } from "../../utils/validations/signupValidation";

// Register user
// POST
export const postSignup = (userData: FormValues) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.signup, userData)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

// User Login
//  POST
export const postLogin = (userData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.login, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
