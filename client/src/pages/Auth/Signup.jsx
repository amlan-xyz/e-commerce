import { useState } from "react";

//actions
import { signupUser } from "../../actions/auth.action";
//contex
import { useAuthContext } from "../../contexts/auth.context";

export const Signup = () => {
  const { state, dispatch } = useAuthContext();
  const [form, setForm] = useState([]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = await signupUser({ ...form });
    dispatch({ type: "LOGIN", payload: user.username });
    setForm([]);
  };
  return (
    <section className="signup__section">
      <h1>Signup</h1>
      {state.username}
      <form onSubmit={handleSignup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setForm((form) => ({ ...form, name: e.target.value }));
          }}
          value={form.name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            setForm((form) => ({ ...form, email: e.target.value }));
          }}
          value={form.email}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => {
            setForm((form) => ({ ...form, username: e.target.value }));
          }}
          value={form.username}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={(e) => {
            setForm((form) => ({ ...form, address: e.target.value }));
          }}
          value={form.address}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          id="phone"
          onChange={(e) => {
            setForm((form) => ({ ...form, phoneNumber: e.target.value }));
          }}
          value={form.phoneNumber}
        />
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="text"
          id="profilePicture"
          onChange={(e) => {
            setForm((form) => ({ ...form, profilePicture: e.target.value }));
          }}
          value={form.profilePicture}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setForm((form) => ({ ...form, password: e.target.value }));
          }}
          value={form.password}
        />
        <button type="submit">Signup</button>
      </form>
    </section>
  );
};
