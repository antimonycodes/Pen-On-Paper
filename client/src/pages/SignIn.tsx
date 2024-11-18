import googleIcon from "../assets/svgs/googleicon.svg";
import facebookIcon from "../assets/svgs/facebookicon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  usernameOrEmail: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    usernameOrEmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Check if fields are filled
    if (!formData.usernameOrEmail || !formData.password) {
      return setErrorMessage("Please fill in all fields");
    }

    // Determine if usernameOrEmail is an email or username
    const isEmail = formData.usernameOrEmail.includes("@");
    const payload = isEmail
      ? { email: formData.usernameOrEmail }
      : { username: formData.usernameOrEmail };

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, password: formData.password }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await res.json();

      if (!data.success) {
        return setErrorMessage(data.message);
      }

      // Navigate to dashboard on success
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-col items-center">
        <p className="text-[#22172B] font-medium text-base my-8">Sign In</p>
        {/* Social buttons */}
        <div className="flex flex-col gap-4 w-full mb-4">
          <button className="w-full text-[#22172B] border flex items-center gap-4 border-[#22172B] py-[10px] px-20 rounded-[32px]">
            <img src={googleIcon} alt="Google Icon" />
            Sign In with Google
          </button>
          <button className="w-full text-[#22172B] border px-20 flex items-center gap-4 border-[#22172B] py-[10px] rounded-[32px]">
            <img src={facebookIcon} alt="Facebook Icon" />
            Continue with Facebook
          </button>
        </div>
        {/* <p className="text-[#22172B] text-xs my-4">
          Sign In With Email Instead
        </p> */}
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Email/Username"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            className="border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D] outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-[#22172B4D] w-full p-[10px] rounded placeholder:text-[#22172B4D]"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 my-4 rounded-[32px] text-white ${
            isLoading ? "bg-gray-400" : "bg-[#22172B]"
          }`}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <p className="text-center">
          Don't have an account? <span className="text-[#631AFD]">Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     emailOrUsername: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value.trim(),
//     });
//     setError(null);
//     console.log("Form data updated:", formData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.emailOrUsername || !formData.password) {
//       setError("All fields are required");
//       console.log("Form submission error: Missing fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       console.log("Submitting form data:", formData);

//       const isEmail = formData.emailOrUsername.includes("@");
//       const payload = isEmail
//         ? { email: formData.emailOrUsername }
//         : { username: formData.emailOrUsername };

//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...payload, password: formData.password }),
//         credentials: "include",
//       });

//       console.log("API Response status:", res.status);

//       const data = await res.json();
//       console.log("API Response data:", data);

//       if (!res.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       // Navigate to dashboard or home page after successful login
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md px-6 py-8">
//       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//         Welcome Back
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {error && (
//           <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-2">
//           <label
//             htmlFor="emailOrUsername"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Email or Username
//           </label>
//           <input
//             type="text"
//             id="emailOrUsername"
//             value={formData.emailOrUsername}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//             placeholder="Enter your email or username"
//           />
//         </div>

//         <div className="space-y-2">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//             placeholder="Enter your password"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full px-4 py-3 text-white bg-[#22172B] rounded-lg hover:bg-opacity-90 transition duration-300 ${
//             loading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? <span>Signing in...</span> : <span>Sign In</span>}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;
