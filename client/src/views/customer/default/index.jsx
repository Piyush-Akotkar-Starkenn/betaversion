import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { MdWebhook } from "react-icons/md";
import { BsTruck, BsFillCpuFill } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Widget from "components/widget/Widget";

const MainDashboard = () => {
  return (
    <div>
      {/* Card widget */}
      <h4 className="text-dark text-xl font-bold dark:text-white">Dashboard</h4>
      <div className="3xl:grid-cols-6 mt-3 grid grid-cols-1 gap-5 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4">
        <Widget
          icon={<BsTruck className="h-7 w-7" />}
          title={"Vehicles"}
          subtitle={"10"}
        />
        <Widget
          icon={<BsFillCpuFill className="h-6 w-6" />}
          title={"Devices"}
          subtitle={"5"}
        />
        <Widget
          icon={<MdWebhook className="h-7 w-7" />}
          title={"Ongoing Trips"}
          subtitle={"29"}
        />
        <Widget
          icon={<AiOutlineCheckSquare className="h-6 w-6" />}
          title={"Completed Trips"}
          subtitle={"10"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2">
        <div className="mb-5 md:mb-0">
          <TotalSpent />
          <br />
          <TotalSpent />
        </div>
        <div>
          <WeeklyRevenue />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
