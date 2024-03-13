// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "./AuthProvider";
// import { useNavigate } from "react-router-dom";
// import { User } from "../services/authFacade";
// import { NavLink } from "react-router-dom";
import "./styling/createaccountpage.css";

const CreateAccountPage = () => {
  //   const [user, setUser] = useState({ username: "", password: "" });

  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const auth = useAuth();

  //   const [err, setErr] = useState(null);

  //   //const from = location.state?.from?.pathname || "/";

  //   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault();

  //     const formData = new FormData(event.currentTarget);
  //     const user = Object.fromEntries(formData) as unknown as User;

  //     setErr(null);
  //     console.log(err);
  //     alert("Login: " + JSON.stringify(user));
  //     auth
  //       .signIn(user)
  //       .then(() => {
  //         const from = location.state?.from?.pathname || "/";
  //         navigate(from, { replace: true });
  //       })
  //       .catch((err) => {
  //         setErr(err);
  //       });
  //   }

  return (
    <div className="login-wrapper">
      <form
        className="login-form"
        //  onSubmit={handleSubmit}
      >
        <h2 id="login-title">Opret konto</h2>
        <div className="login-form-group">
          <label htmlFor="username">Brugernavn:</label>
          <input
            type="text"
            name="username"
            // value={user.username}
            // onChange={(e) =>
            //   setUser((prev) => ({ ...prev, username: e.target.value }))
            // }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Kodeord:</label>
          <input
            type="password"
            name="password"
            // value={user.password}
            // onChange={(e) =>
            //   setUser((prev) => ({ ...prev, password: e.target.value }))
            // }
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Skriv kodeord igen:</label>
          <input
            type="password"
            name="password"
            // value={user.password}
            // onChange={(e) =>
            //   setUser((prev) => ({ ...prev, password: e.target.value }))
            // }
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Opret Konto
        </button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
