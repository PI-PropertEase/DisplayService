import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen w-screen fixed">
        <Navbar />
        <Drawer />
      </div>
    </>
  );
};

export default Dashboard;
