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
  return { username: data.username };
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
  return { username: data.username };
};
