import { useState } from "react";
import { useAuth } from "../security/AuthProvider";
import { User } from "../services/authFacade";
import "./styling/createaccountpage.css";

const CreateAccountPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const auth = useAuth();

  const [err, setErr] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData) as unknown as User;

    if (user.password !== user.confirmPassword) {
      setErr("Kodeordene er ikke ens");
      return;
    }
    auth
      .create(user)
      .then(() => {
        auth
          .signIn(user)
          .then(() => {
            // wait 1 second to ensure that the user is created before navigating.
            setTimeout(() => (window.location.pathname = "/"), 1000);
          })
          .catch((err) => {
            setErr(err);
          });
      })
      .catch((err) => {
        setErr(err);
      });
  }

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 id="login-title">Opret konto</h2>
        <div className="login-form-group">
          <label htmlFor="username">Brugernavn:</label>
          <input
            type="text"
            name="username"
            min="3"
            max="20"
            value={user.username}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="email">E-mail adresse:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Kodeord:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Skriv kodeord igen:</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            required
          />
        </div>
        {err && <p color="red">{err}</p>}
        <button type="submit" className="login-btn">
          Opret Konto
        </button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
