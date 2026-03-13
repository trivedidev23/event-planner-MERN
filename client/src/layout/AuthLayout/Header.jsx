import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/userApi";
import { setIsAuthenticated } from "../../store/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const onLogOut = async () => {
    try {
      const data = await logout().unwrap();
      if (data?.message) toast.success(data?.message);
      if (data?.success) {
        dispatch(setIsAuthenticated(false));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="d-flex justify-content-between mt-1 align-items-center">
      <h1>Event Planner</h1>
      <button className="btn btn-secondary small h-50" onClick={onLogOut}>
        Logout
      </button>
    </div>
  );
};

export default Header;
