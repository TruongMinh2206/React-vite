import { Navigate, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";


import Login from "./pages/Login";
import SignUp from "./pages/Sign-up";
import Welcome from "./pages/Welcome";
import AllLesson from "./pages/lessons/AllLesson";
import Lesson1 from "./pages/lessons/Lesson1";
import Lesson2 from "./pages/lessons/Lesson2";
import Lesson3 from "./pages/lessons/Lesson3";
import Lesson4 from "./pages/lessons/Lesson4";
import Lesson5 from "./pages/lessons/Lesson5";
import Lesson6 from "./pages/lessons/Lesson6";
import Lesson7 from "./pages/lessons/Lesson7";
import Lesson8 from "./pages/lessons/Lesson8";

const AppRouter = () => {
  const isAuthenticated = true;
  return (
    <Routes>
       <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {isAuthenticated ? (
        <>
          <Route path="/" element={<Welcome />}>
            <Route index element={<Welcome />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>

          <Route path="/" element={<Navigate to="/AllLesson" />} />
          <Route path="/alllesson" element={<AllLesson />} />
          <Route path="/lesson1" element={<Lesson1 />} />
          <Route path="/lesson2" element={<Lesson2 />} />
          <Route path="/lesson3" element={<Lesson3 />} />
          <Route path="/lesson4" element={<Lesson4 />} />
          <Route path="/lesson5" element={<Lesson5 />} />
          <Route path="/lesson6" element={<Lesson6 />} />
          <Route path="/lesson7" element={<Lesson7 />} />
          <Route path="/lesson8" element={<Lesson8 />} />
        </>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
};

export default AppRouter;
