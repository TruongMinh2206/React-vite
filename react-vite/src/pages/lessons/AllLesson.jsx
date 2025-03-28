import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Bartab from "../../components/Bartab";
const AllLesson = () => {
  return (
    <>
      <Header></Header>
      <div className="flex w-full">
        <Bartab></Bartab>
        <div className="border body p-8 w-full">
          <div className="container grid grid-cols-3">
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson1"}
            >
              Lesson 1
            </Link>
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson2"}
            >
              Lesson 2
            </Link>
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson3"}
            >
              Lesson 3
            </Link>
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson4"}
            >
              Lesson 4
            </Link>
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson5"}
            >
              Lesson 5
            </Link>
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson6"}
            >
              Lesson 6
            </Link>
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson7"}
            >
              Lesson 7
            </Link>
            <Link
              className="m-6 bg-slate-400 p-8 rounded cursor-pointer hover:bg-slate-200"
              to={"/lesson8"}
            >
              Lesson 8
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllLesson;
