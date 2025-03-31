import Header from "../../components/Header";
import Bartab from "../../components/Bartab";
import ExtendForm from "../../components/ExtendForm";
const Lesson6 = () => {
  return (
    <>
      <Header></Header>
      <div className="flex w-full">
        <Bartab></Bartab>
        <div className="w-full  border body p-8">
          <ExtendForm></ExtendForm>
          </div>;
      </div>
    </>
  );
};

export default Lesson6;
