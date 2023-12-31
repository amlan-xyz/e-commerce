import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
//actions
import { loginUser, signupUser } from "../../actions/auth.action";
//contex
import { useAuthContext } from "../../contexts/auth.context";

export const Signup = () => {
  const { dispatch } = useAuthContext();
  const [form, setForm] = useState([]);

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = await signupUser({ ...form });
    dispatch({ type: "LOGIN", payload: user });
    navigate(location?.state?.from?.pathname || "/");
    setForm([]);
  };

  const handleGuestLogin = async () => {
    const user = await loginUser({
      username: "guest_user",
      password: "guest123",
    });
    dispatch({ type: "LOGIN", payload: user });
    navigate(location?.state?.from?.pathname || "/");
    setForm([]);
  };

  return (
    <section className="auth__section">
      <div className="auth__container">
        <h2>Signup</h2>
        <form className="auth__form flex" onSubmit={handleSignup}>
          <div className="auth__item">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              onChange={(e) => {
                setForm((form) => ({ ...form, name: e.target.value }));
              }}
              value={form.name}
            />
          </div>
          <div className="auth__item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address (e.g., email@example.com)"
              onChange={(e) => {
                setForm((form) => ({ ...form, email: e.target.value }));
              }}
              value={form.email}
            />
          </div>
          <div className="auth__item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter a unique username"
              onChange={(e) => {
                setForm((form) => ({ ...form, username: e.target.value }));
              }}
              value={form.username}
            />
          </div>

          <div className="auth__item">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              id="phone"
              placeholder="Enter your phone number (e.g., 123-456-7890)"
              onChange={(e) => {
                setForm((form) => ({ ...form, phoneNumber: e.target.value }));
              }}
              value={form.phoneNumber}
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
              placeholder="Enter a strong password"
              onChange={(e) => {
                setForm((form) => ({ ...form, password: e.target.value }));
              }}
              value={form.password}
            />
          </div>
          <div className="auth__item">
            <button className="submit__btn" type="submit">
              Signup
            </button>
          </div>
        </form>
        <div className="auth__footer flex">
          <p className="auth__alt-link">
            Already signed up ?{" "}
            <Link className="font__accent-color" to="/login">
              {" "}
              Login
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
