import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import banner1 from "../assets/authbanner1.png";
import logo from "../assets/svgs/logo.svg";

const SIGNIN_PATH = "/sign-in";
const SIGNUP_PATH = "/sign-up";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("sign-in");

  // Sync the active state with the current route
  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes("sign-up")) {
      setActive("sign-up");
    } else if (pathname.includes("sign-in")) {
      setActive("sign-in");
    } else {
      navigate(SIGNIN_PATH);
    }
  }, [location.pathname, navigate]);

  // Handle slider button clicks
  const handleSliderClick = (type) => {
    setActive(type);
    navigate(`/${type}`);
  };

  const Button = ({ type, children }) => (
    <button
      aria-pressed={active === type}
      className={`px-6 py-2 rounded-xl w-[50%] ${
        active === type
          ? "bg-[#22172B] text-white shadow-lg"
          : "bg-transparent text-black"
      } transition duration-300`}
      onClick={() => handleSliderClick(type)}
    >
      {children}
    </button>
  );

  return (
    <div
      className="h-screen relative w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className="bg-[#FFFFFFCC] absolute inset-0"></div>
      <img
        src={logo}
        alt="Logo"
        className="absolute left-0 top-0"
        width={120}
      />

      <div className="absolute z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="shadow-[0px_4px_40px_rgba(0,0,0,0.15)] px-8 py-4 bg-white rounded-xl max-w-[457px]">
            {/* Slider */}
            <div className="flex items-center justify-between bg-[#F4ECFF] p-1 rounded-xl w-[385px]">
              <Button type="sign-in">Sign In</Button>
              <Button type="sign-up">Sign Up</Button>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
