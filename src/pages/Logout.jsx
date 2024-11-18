import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../helpers";
const storeduser = localStorage.getItem("user");
import { useAuth } from "../contexts/AuthContext";


export const Logout = () => {
  const { setAuth, user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete Axios.defaults.headers.common['Authorization'];
  }

  useEffect(()=>{
    if (!storeduser){
      navigate("/threadandthrottle/login");
    }
  },[]);

  return (
    <div>
      <button
        className="btn btn-sm no-animation bg-grey-500 hover:bg-grey-700 text-slate-300 font-bold py-2 px-4 border border-grey-700 rounded"
        onClick={logout}
      >
        {" "}
        Log Out
      </button>
    </div>
  );
};
