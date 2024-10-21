import { apiCall } from "./apiCalls";
import { userUrls, propertyUrls } from "./endpoints";
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

// get Users
//  Get
export const getUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.getUsers, null)
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

// User block or unblock
//  PATCH
export const blockUser = (userData: { email: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", userUrls.blockUser, userData)
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

// Change user role
//  PATCH
export const changeRole = (userData: { email: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", userUrls.changeRole, userData)
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


// get properties
//  Get
export const getAllProperties = () => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("get", propertyUrls.getAllProperties, null)
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


// add properties
//  POST
export const addProperty = (propertyData: any) => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", propertyUrls.addProperty, propertyData)
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

//@dec      Get Property Detail
//method    get

export const getPropertyDetail = (propertyId: string | undefined) => {
    return new Promise((resolve, reject) => {
      try {
        const url:string=`${propertyUrls.getPropertyDetail}/${propertyId}`
        apiCall("get", url, null)
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