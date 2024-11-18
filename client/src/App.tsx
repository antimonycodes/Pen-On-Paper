import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "./layout/AuthLayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

function App() {
  const notify = () => toast("This is a toast notification!");

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
