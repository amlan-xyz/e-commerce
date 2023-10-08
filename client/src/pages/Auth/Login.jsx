import { useState } from "react";

//actions
import { loginUser } from "../../actions/auth.action";

//contex
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/auth.context";

export const Login = () => {
  const { state, dispatch } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginUser({ username, password });
    dispatch({ type: "LOGIN", payload: user });
    navigate(location?.state?.from?.pathname || "/");
    setUsername("");
    setPassword("");
  };

  return (
    <section className="login__section">
      {state.username}
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
