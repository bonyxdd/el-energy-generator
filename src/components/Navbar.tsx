import { Link } from "react-router-dom";
import { LoginRegister } from "./LoginRegister";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorized } from "../redux/reduxActions";
export const Navbar = () => {
  const dispatch = useDispatch();
  const authorized = useSelector((state: any) => state.store.authorized);
  const username = useSelector((state: any) => state.store.username);

  return (
    <nav>
      {authorized && (
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
      )}
      <div className="login">{!authorized && <LoginRegister />}</div>
    </nav>
  );
};
