import { useState } from "react";
import { UserRegistration } from "./UserRegistration";
import apiData from "../assets/apiKey.json";
import { UserLogin } from "./UserLogin";

export const LoginRegister = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [register, setRegister] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleLoginRegisterSwitch = () => {
    setRegister((prev) => !prev);
  };
  return (
    <>
      <input
        className="button"
        type="button"
        onClick={toggleDialog}
        value="Login / Register"
      />
      {isDialogOpen && (
        <>
          <div className="dialogmenu__bcg">
            <div className="dialogmenu__wrapper">
              {register ? (
                <UserRegistration
                  apiUrl={apiData.apiUrl}
                  apiKey={apiData.apiKey}
                />
              ) : (
                <UserLogin apiUrl={apiData.apiUrl} apiKey={apiData.apiKey} />
              )}
              <div className="buttonwrap">
                <input
                  className="button--link"
                  type="button"
                  value={register ? "Login" : "Register"}
                  onClick={handleLoginRegisterSwitch}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
