import { Link } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
const Navbar = () => {
  const { user, logoutUser } = UserAuth();
  return (
    <>
      {user ? (
        <ul className='flex items-center gap-10 justify-between p-3  bg-blue-600 text-white font-medium mb-2'>
          <div className='flex items-center gap-10'>
            <li>
              <Link to='/'>Home</Link>
            </li>

            <li>
              <Link to='/notes'>Notes</Link>
            </li>
          </div>

          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul className='flex items-center gap-10 justify-between p-3  bg-blue-600 text-white font-medium mb-2'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <div className='flex items-center gap-10'>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </div>
        </ul>
      )}
    </>
  );
};

export default Navbar;
