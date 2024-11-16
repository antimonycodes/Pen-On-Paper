import googleIcon from "../assets/svgs/googleicon.svg";
import facebookIcon from "../assets/svgs/facebookicon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  email: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill in all fields");
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      console.log(data);
      if (data.sucess === false) {
        return setErrorMessage(data.message);
      }
      setIsLoading(false);
      // Redirect to login page or show success message
      if (data.success === true) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-col items-center">
        <p className="text-[#22172B] font-medium text-base my-8">Signing up</p>
        <div className="flex flex-col gap-4 w-full">
          <button className="w-full text-[#22172B] border flex items-center gap-4 border-[#22172B] py-[10px] px-20 rounded-[32px]">
            <img src={googleIcon} alt="Google icon" />
            Sign Up with your Google
          </button>
          <button className="w-full text-[#22172B] border flex items-center gap-4 border-[#22172B] py-[10px] px-20 rounded-[32px]">
            <img src={facebookIcon} alt="Facebook icon" />
            Continue with Facebook
          </button>
        </div>
        <p className="text-[#22172B] text-xs my-4">
          Sign Up With Email Instead
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            onChange={handleChange}
            placeholder="Email"
            aria-label="Email"
            className="border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D] outline-none"
          />
          <input
            type="text"
            id="username"
            onChange={handleChange}
            placeholder="Username"
            aria-label="Username"
            className="border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D]"
          />
          <input
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Create Password"
            aria-label="Password"
            className="border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D]"
          />
        </div>
        <button
          className="w-full py-4 my-4 rounded-[32px] text-white bg-[#22172B]"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Confirm E-mail"}
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span className="text-[#631AFD]">Sign In</span>
        </p>
      </form>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

export default SignUp;
