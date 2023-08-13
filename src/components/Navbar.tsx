import { Link } from "react-router-dom";
import { LoginRegister } from "./LoginRegister";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorized } from "../redux/reduxActions";
import { useState } from "react";
export const Navbar = () => {
  const dispatch = useDispatch();
  const authorized = useSelector((state: any) => state.store.authorized);
  const username = useSelector((state: any) => state.store.username);
  const [navToggle, setNavToggle] = useState(false);
  return (
    <nav className={`${navToggle ? "nav--hidden" : ""}`}>
      {authorized && (
        <>
          <button className="toggle-nav" onClick={()=>setNavToggle(!navToggle)}>x</button>
        <ul>
          <li>
            <Link to="/generators">Generators</Link>
          </li>
          <li>
            <Link to="/data">All data</Link>
          </li>
          <button
            className="user button--link"
            type="submit"
            onClick={() => dispatch(setAuthorized(false))}
          >
            Log out: {username}
          </button>
          </ul>
          </>
      )}
      <div className="login">{!authorized && <LoginRegister />}</div>
    </nav>
  );
};
