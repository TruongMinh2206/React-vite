import Header from "../../components/Header";
import Bartab from "../../components/Bartab";
// import ProductTable from "../../components/ProductTable"
import TableTest from "../../components/TableTest"
const Lesson5 = () => {
  return (
    <>
      <Header></Header>
      <div className="flex w-full">
        <Bartab></Bartab>
        <div className="w-full border body p-8">
          {/* <ProductTable /> */}
          <TableTest />
        </div>
      </div>
    </>
  );
};

export default Lesson5;
