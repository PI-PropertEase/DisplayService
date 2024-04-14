import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import PropertyTable from "../components/PropertyTable";

const PropertyListPage: React.FC = () => {
    return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row flex-1">
          <Drawer />
          <div className="flex flex-col flex-1 pt-16 h-screen border-gray-200 dark:border-gray-800 m-2 rounded-xl shadow-lg">
            <PropertyTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListPage;
