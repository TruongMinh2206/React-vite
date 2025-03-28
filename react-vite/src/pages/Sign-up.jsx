import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../store/authSlice";
import bgVideo from "../assets/images/bg-sign-in-basic.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("Nhập lại mật khẩu trùng khớp", { position: "top-right" });
      return;
    }

    // Lưu tài khoản vào Redux
    dispatch(signUp({ username, email, password }));

    toast.success("Đăng ký thành công!", { position: "top-right" });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gray-900">
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="relative z-10 w-full sm:max-w-md bg-white bg-opacity-80 rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:bg-opacity-80">
        <h1 className="text-xl font-bold text-center text-gray-900 md:text-2xl dark:text-white">
          Sign up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 rounded-lg p-2.5">
            Sign up
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-primary-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignUp;
