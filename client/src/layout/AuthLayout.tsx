import { Outlet } from "react-router-dom";
import banner1 from "../assets/authbanner1.png";
import logo from "../assets/svgs/logo.svg";
import { useState } from "react";

const AuthLayout = () => {
  const [active, setActive] = useState("signin");
  return (
    <div
      className="h-screen relative w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${banner1})`,
        height: "100vh",
        width: "100%",
      }}
    >
      <div className=" bg-[#FFFFFFCC] absolute top-0 left-0 w-screen h-screen inset-0"></div>
      <img src={logo} alt="" className=" absolute left-0 top-0" width={120} />

      {/*  */}
      <div className=" absolute z-50">
        <div className=" flex flex-col items-center gap-4">
          <div className=" shadow-[0px_4px_40px_rgba(0,0,0,0.15)] px-8 py-4 bg-white rounded-xl max-w-[457px]">
            {/* slider */}
            <div className="flex items-center justify-between bg-[#F4ECFF] p-1 rounded-xl w-[385px]">
              <button
                className={`px-6 py-2 rounded-xl w-[50%] ${
                  active === "signin"
                    ? "bg-[#22172B] text-white shadow-lg"
                    : "bg-transparent text-black"
                } transition duration-300`}
                onClick={() => setActive("signin")}
              >
                Sign In
              </button>
              <button
                className={`px-6 py-2 rounded-xl w-[50%] ${
                  active === "signup"
                    ? "bg-[#22172B] text-white shadow-lg"
                    : "bg-transparent text-black"
                } transition duration-300`}
                onClick={() => setActive("signup")}
              >
                Sign Up
              </button>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
