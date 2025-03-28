import Header from "../../components/Header";
import Bartab from "../../components/Bartab";

const Lesson2 = () => {
  return (
    <>
      <Header></Header>
      <div className="flex w-full">
        <Bartab></Bartab>
        <div className="border body p-8 w-full">
          <div>
            <h2 className="mb-6 font-bold">Thực hành router </h2>
            <p>
              Sử dụng react router dom để tổ chức router cho các màn sau: Đăng
              nhập, đăng ký, quên mật khẩu, welcome page, danh sách bài tập, chi
              tiết bài tập, layout sau khi đăng nhập ( header, sidebar ){" "}
            </p>
            <p>Sử dụng redux để lưu trạngthái đăng nhập</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson2;
