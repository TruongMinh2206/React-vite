import Header from "../../components/Header";
import Bartab from "../../components/Bartab";
import TodoList from "../../components/TodoList";
const Lesson7 = () => {
  return (
    <>
      <Header></Header>
     
      <div className="flex w-full">
        <Bartab></Bartab>
        <TodoList  />
      </div>
    </>
  );
};

export default Lesson7;
