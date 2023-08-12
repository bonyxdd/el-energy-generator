import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface UserRegistrationProps {
  apiUrl: string;
  apiKey: string;
}

export const UserRegistration: React.FC<UserRegistrationProps> = ({
  apiUrl,
  apiKey,
}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password || !userName) {
      setError("Fill in all information");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (userName.length < 4) {
      setError("Username should be at least 5 characters long");
      return;
    }
    if (password.length < 5) {
      setError("Password should be at least 5 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response: AxiosResponse = await axios.post(
        apiUrl + "/User/RegisterUser",
        {
          token: apiKey,
          email,
          password,
          userName,
        }
      );
      if (response.data.status === 1) {
        console.error(response);
        setError("Registered");
      } else if (response.data.status === 8) {
        setError(response.data.description);
      }
    } catch (error) {
      setError("Invalid username or password");
      console.error(error);
    }

    return null;
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          id="email"
          autoComplete="off"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={userName}
          id="username"
          autoComplete="off"
          onChange={(event) => setUserName(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          id="password"
          autoComplete="off"
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="password">Password again</label>
        <input
          type="password"
          value={confirmPassword}
          id="confirmPassword"
          autoComplete="off"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <div className="buttonwrap">
          <input className="button" type="submit" value="Register" />
        </div>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};
