import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { Link } from "react-router-dom";
//actions
import { loginUser } from "../../actions/auth.action";

//contex

import { useAuthContext } from "../../contexts/auth.context";

import "./Auth.css";

export const Login = () => {
  const { dispatch } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

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

  const handleGuestLogin = async () => {
    const user = await loginUser({
      username: "guest_user",
      password: "guest123",
    });
    dispatch({ type: "LOGIN", payload: user });
    navigate(location?.state?.from?.pathname || "/");
    setUsername("");
    setPassword("");
  };

  return (
    <section className="auth__section">
      <div className="auth__container">
        <h2>Login</h2>

        <form onSubmit={handleLogin} className="auth__form flex">
          <div className="auth__item ">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="auth__item">
            <label className="show__password" htmlFor="password">
              <span>Password</span>
              <div>
                <label htmlFor="show-password">Show password</label>
                <input
                  type="checkbox"
                  onChange={togglePasswordVisibility}
                  id="show-password"
                />
              </div>
            </label>
            <input
              type={passwordType}
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="auth__item ">
            <button className="submit__btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="auth__footer flex">
          <p className="auth__alt-link">
            New user ?{" "}
            <Link className="font__accent-color" to="/signup">
              {" "}
              Signup
            </Link>
          </p>
          <p className="auth__alt-link">
            <button className="link__btn" onClick={handleGuestLogin}>
              Guest User
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
