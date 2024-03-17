export default function Drawer() {
  return (
    <div className="h-full w-[16rem] invisible lg:visible bg-primary text-black font-bold">
      {/* Drawer buttons here */}
      <div className="bg-orange-300 bg-clip-content pt-10 pb-5 content-center justify-center text-center">
        <button className="btn-ghost">My business</button>
      </div>
      <div className="bg-orange-300 bg-clip-content pt-10 pb-5 content-center justify-center text-center">
        <button className="btn-ghost">Properties List</button>
      </div>
      <div className="bg-orange-300 bg-clip-content pt-10 pb-5 content-center justify-center text-center">
        <button className="btn-ghost">Calendar</button>
      </div>
      <div className="bg-orange-300 bg-clip-content pt-10 pb-5 content-center justify-center text-center">
        <button className="btn-ghost">Integrations</button>
      </div>
      <div className="bg-orange-300 bg-clip-content pt-10 pb-5 content-center justify-center text-center">
        <button className="btn-ghost">Statistics</button>
      </div>
    </div>
  );
}
