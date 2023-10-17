const backend_api = "http://localhost:3001/users";

export const loginUser = async (credentials) => {
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
};

export const signupUser = async (userData) => {
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
};

export const fetchUserProfile = async () => {
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
};
