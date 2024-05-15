
import Drawer from "../components/Drawer";
import ModalDeletePropertyDetail from "../components/ModalDeletePropertyDetail";
import ModalPropertyDetails from "../components/ModalPropertyDetails";
import Navbar from "../components/Navbar";
import PropertyDetailsAllTables from "../components/PropertyDetailsAllTables";


export default function PropertyDetails() {

    return (
        <>
            <Navbar />
            <div className="flex flex-row">
                <Drawer />
                <div className="flex-1 p-8 overflow-y-auto h-svh gap-4">
                    <h1 className="text-accent text-2xl mt-20 font-semibold">Property Management</h1>
                    <p className="font-light my-4">Welcome to the Property Management Hub. This page empowers you to effortlessly oversee all aspects of your property. From viewing detailed property information to managing reservations and  scheduling maintenance and cleaning events, take full control of your property management experience with ease.</p>
                    <PropertyDetailsAllTables/>
                </div>
            </div>
            <ModalPropertyDetails />
            <ModalDeletePropertyDetail />
        </>
    );
}

