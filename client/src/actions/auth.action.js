import { toast } from "react-toastify";
import { BASE_URL } from "../utils/baseUrl";

const backend_api = `${BASE_URL}/users`;

export const loginUser = async (credentials) => {
  try {
    const url = `${backend_api}/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const { data } = await response.json();
    localStorage.setItem("token", data.token);
    toast.success("Login successful");
    return data.user;
  } catch (error) {
    toast.error("Login failed");
    console.log(error);
  }
};

export const signupUser = async (userData) => {
  try {
    const url = `${backend_api}/signup`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const { data } = await response.json();
    localStorage.setItem("token", data.token);
    toast.success("Signup successful");
    return data.user;
  } catch (error) {
    toast.error("Signup failed");
    console.error(error);
  }
};

export const fetchUserProfile = async () => {
  try {
    const url = `${backend_api}/profile`;
    const response = await fetch(url, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addNewAddress = async (userId, addressBody) => {
  try {
    const url = `${backend_api}/${userId}/address/add`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressBody),
    });
    const { data } = await response.json();
    toast.success("Address added");
    return data;
  } catch (error) {
    toast.error("Error adding address");
  }
};

export const removeAddress = async (userId, addressId) => {
  try {
    const url = `${backend_api}/${userId}/address/${addressId}/delete`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    toast.success("Address removed");
    return data;
  } catch (error) {
    toast.error("Error removing address");
  }
};
