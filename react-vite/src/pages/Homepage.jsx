// import { Outlet } from 'react-router-dom';
import Bartab from '../components/Bartab'
import Header from "../components/Header";
import HomeRouter from '../HomeRouter';

const HomePage = () => {
  return (
      <>
        <Header></Header>
        <div className="flex w-full">
          <Bartab></Bartab>
          <HomeRouter></HomeRouter>
        </div>
      </>
  );
};

export default HomePage;
