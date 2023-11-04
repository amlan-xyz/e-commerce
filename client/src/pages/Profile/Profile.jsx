import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/auth.context";
import "./Profile.css";
export const Profile = () => {
  const { state } = useAuthContext();

  const user = state.user;

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    state.isLoggedIn = false;
    state.user = null;
    navigate("/");
  };

  return (
    <div className="profile__container">
      <h1 className="text__center">Profile</h1>
      <div className="profile__body">
        <p>
          <b>Name:</b> <br /> {user.name}
        </p>
        <p>
          <b>Username:</b> <br /> {user.username}
        </p>
        <p>
          {" "}
          <b>Email:</b> <br /> {user.email}
        </p>
        <p>
          {" "}
          <b>Phone Number:</b> <br /> {user.phoneNumber}
        </p>
        <p>
          {" "}
          <b>Address:</b> <br /> {user.address}
        </p>
        <button onClick={handleLogout} className="primary__btn">
          Logout
        </button>
      </div>
    </div>
  );
};
