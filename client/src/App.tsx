import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
