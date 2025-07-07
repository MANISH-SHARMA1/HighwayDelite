import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
