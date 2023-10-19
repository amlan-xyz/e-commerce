const backend_api = "https://e-commerce-backend.theweird0ne.repl.co/users";

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
    return data.user;
  } catch (error) {
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
    return data.user;
  } catch (error) {
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
    if (response.status === 200) {
      return data.user;
    }
  } catch (error) {
    console.error(error);
  }
};
