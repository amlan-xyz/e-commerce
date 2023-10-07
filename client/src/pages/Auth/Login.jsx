import { useState } from "react";

//actions
import { loginUser } from "../../actions/auth.action";

//contex
import { useAuthContext } from "../../contexts/auth.context";

export const Login = () => {
  const { dispatch } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: username, password: password }));
    setUsername("");
    setPassword("");
  };

  return (
    <section className="login__section">
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};
