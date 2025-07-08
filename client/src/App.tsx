import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess";
import OnlyIfNotLoggedIn from "./utils/OnlyIfNotLoggedIn";
import RequireUser from "./utils/RequireUser";

function App() {

  return (
    <Routes>
      <Route element={<RequireUser />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<OnlyIfNotLoggedIn />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/auth/google/success"
          element={<GoogleAuthSuccess />}
        />
      </Route>
    </Routes>

  );
}

export default App;
