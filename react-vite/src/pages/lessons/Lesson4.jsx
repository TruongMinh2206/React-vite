import Header from "../../components/Header";
import Bartab from "../../components/Bartab";
import UserProfileForm from "../../components/FormOnsubmit";
import OnblurForm from "../../components/FormOnBlur";

const Lesson4 = () => {
  return (
    <>
      <Header></Header>
      <div className="flex w-full">
        <Bartab></Bartab>
        <div className=" w-full">
          <OnblurForm></OnblurForm>
          <UserProfileForm></UserProfileForm>
        </div>
      </div>
    </>
  );
};

export default Lesson4;
