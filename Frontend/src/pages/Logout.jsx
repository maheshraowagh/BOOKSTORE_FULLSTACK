import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../Store/auth';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle the logout process
  
    const handleLogout = () => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      };

    // You might want to call the logout function on a button click or similar event
    // For example:
    // return <button onClick={handleLogout}>Logout</button>;

    // If you want to logout immediately when the component is rendered, you can call the function directly
    handleLogout();

    // Since the logout process doesn't need to render any UI, we can return null
    return null;
};

export default Logout;