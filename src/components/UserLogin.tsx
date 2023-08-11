import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthorized, setUserName } from "../redux/reduxActions";
import axios, { AxiosResponse } from "axios";

interface LoginProps {
  apiUrl: string;
  apiKey: string;
}

export const UserLogin: React.FC<LoginProps> = ({ apiUrl, apiKey }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response: AxiosResponse = await axios.get(
        apiUrl +
          "/User/ValidateUser?token=" +
          apiKey +
          "&email=" +
          email +
          "&password=" +
          password
      );
      if (response.data.status === 1) {
        dispatch(setAuthorized(true));
        dispatch(setUserName(email));
        setError("Authorized");
      } else if (response.data.status) {
        setError(response.data.description);
      }
    } catch (error) {
      setError("Invalid email or password");
    }
    return null;
  };

  return (
    <>
      <h2>Log In</h2>
      <form id="login" onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="buttonwrap">
          <input className="button" type="submit" value="Log In" />
        </div>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};
