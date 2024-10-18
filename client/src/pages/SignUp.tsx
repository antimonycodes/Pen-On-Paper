// import logo from "../assets/svgs/logo.svg";
import googleIcon from "../assets/svgs/googleicon.svg";
import facebookIcon from "../assets/svgs/facebookicon.svg";
const SignUp = () => {
  return (
    // <div>
    //   <img src={logo} alt="" />
    //   <div className=" shadow-[0px_4px_40px_rgba(0,0,0,0.15)] p-8 bg-white rounded-xl">
    //     {/* slider */}
    //     <div></div>
    <div className=" mt-2">
      <div className=" flex flex-col items-center">
        <p className=" text-[#22172B] font-medium text-base my-8">Signing up</p>
        {/* buttons */}
        <div className=" flex flex-col gap-4 w-full">
          <button className=" w-full text-[#22172B] border flex items-center gap-4 border-[#22172B] py-[10px] px-20 rounded-[32px]">
            <img src={googleIcon} alt="" />
            Sign Up with your Google
          </button>
          <button className=" w-full text-[#22172B] border px-20  flex items-center gap-4 border-[#22172B] py-[10px] rounded-[32px]">
            <img src={facebookIcon} alt="" />
            Continue with Facebook
          </button>
        </div>
        <p className=" text-[#22172B] text-xs my-4">
          Sign Up With Email Instead{" "}
        </p>
      </div>
      {/* form */}
      <form action="">
        <div className=" flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            className=" border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D] outline-none "
          />
          <input
            type="text"
            placeholder="Username"
            className=" border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D] "
          />{" "}
          <input
            type="text"
            placeholder="Create Password"
            className=" border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D] "
          />
        </div>
        <button className=" w-full py-4 my-4 rounded-[32px] text-white bg-[#22172B]">
          Confirm E-mail
        </button>
        <p className=" text-center">
          Already have an account ?{" "}
          <span className=" text-[#631AFD]">Sign In</span>
        </p>
      </form>
    </div>
    //   </div>
    // </div>
    // <div>Sign Up</div>
  );
};

export default SignUp;
