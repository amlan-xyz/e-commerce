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
  console.log(data);
};
