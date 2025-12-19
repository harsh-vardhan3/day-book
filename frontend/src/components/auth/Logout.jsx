import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../redux/features/userSlice";
import apiSlice from "../../redux/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ close }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      dispatch(removeUserInfo());
      dispatch(apiSlice.util.resetApiState()); // Clear all cached API data
      navigate("/");
      close();
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <div>
      <h1 className="text-lg">Are you sure you want to log out?</h1>
      <div className="modal-action">
        <button onClick={close} className="btn btn-success">
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="btn btn-error"
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};
export default Logout;
