import { useAuthContext } from "../../contexts/auth.context";

export const Profile = () => {
  const { state } = useAuthContext();
  return (
    <section className="profile__section">
      <h1>{state.user.username}</h1>
    </section>
  );
};
