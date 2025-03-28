import {  NavLink } from "react-router-dom";

const Bartab = () => {
  return (
    <aside
      className="sidebar transition-transform -translate-x-full sm:translate-x-0 w-[11.5%]"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson1"}
            >
              <span className="ml-3">Lesson 1</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson2"}
              aria-current="page"
            >
              <span className="ml-3">Lesson 2</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson3"}
            >
              <span className="ml-3">Lesson 3</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson4"}
            >
              <span className="ml-3">Lesson 4</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson5"}
            >
              <span className="ml-3">Lesson 5</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson6"}
            >
              <span className="ml-3">Lesson 6</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson7"}
            >
              <span className="ml-3">Lesson 7</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return `${
                  isActive ? "bg-green-400" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700`;
              }}
              to={"/lesson8"}
            >
              <span className="ml-3">Lesson 8</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Bartab;
