import { Link } from "react-router-dom";
import bgVideo from "../assets/images/bg-sign-in-basic.mp4";
const Welcome = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center flex-col text-[#000]">

      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
              <source src={bgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video> 
      <h1 className=" relative text-6xl font-bold m-4 text-[#FFF]">Welcome</h1>
      <Link to={"/alllesson"} className="relative hover:text-blue-500 text-[#FFF] text-[20px]">👉 Go to lesson list</Link>
    </div>
  );
};

export default Welcome;
