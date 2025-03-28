import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import bgVideo from "../assets/images/bg-sign-in-basic.mp4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const authState = useSelector((state) => state.auth);
  const users = authState?.users || []; 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      dispatch(login(user));
      navigate("/welcome");
    } else {
      toast.error("Sai tài khoản hoặc mật khẩu !", { position: "top-right" });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gray-900">
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 w-full sm:max-w-md bg-white bg-opacity-80 rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700">
        <h1 className="text-xl font-bold text-center text-gray-900 md:text-2xl dark:text-white">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="name@company.com"
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
              id="password"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <a href="/auth/forgot" className="text-sm text-primary-600 hover:underline dark:text-primary-500">
              Forgot password?
            </a>
          </div>


          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 rounded-lg p-2.5">
            Sign in
          </button>

         
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Don’t have an account yet?{" "}
            <a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
