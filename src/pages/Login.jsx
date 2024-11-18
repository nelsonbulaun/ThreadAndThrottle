import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
import { SplitScreen } from "../components/SplitScreen";
const storeduser = localStorage.getItem("user");
import { url } from "../helpers";
const apisite = url + "/token";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); 
      navigate('/ThreadAndThrottle')
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const content = (
    <div>
      <div className="text-left pb-3">
        <Link to="register" className="text-sm">
         New User? Create An Account
        </Link>
      </div>
      <form
        className="flex flex-col space-y-0.5 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="break-after-auto rounded border border-[#1b4796] flex bg-transparent"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className=" break-after-auto rounded border border-[#1b4796] flex bg-transparent "
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className="btn btn-sm outline-grey-900 bg-[#1b4796]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
  return (
    <SplitScreen title={"Login."} image='/mcstock.jpg' content={content} />
  );

};

export default Login;
