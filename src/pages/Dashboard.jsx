import Header from "../component/Header";
import StatsCard from "../component/StatsCard";
import LineChart from "../component/LineChart";
import PieChart from "../component/PieChart";
import PopularProducts from "../component/PopularProducts";
import CustomerList from "../component/CustomerList";
import Sidebar from "../component/AdminEvent/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6 ml-64"> {/* Add ml-64 to account for sidebar width */}
          <StatsCard />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <LineChart className="lg:col-span-2" />
            <PieChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomerList />
            <PopularProducts />
          </div>
        </div>
      </div>
    </div>
  );
}

