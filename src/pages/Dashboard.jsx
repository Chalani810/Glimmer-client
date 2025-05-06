import Header from "../component/Header";
import StatsCard from "../component/StatsCard";
import LineChart from "../component/LineChart";
import PieChart from "../component/PieChart";
import PopularProducts from "../component/PopularProducts";
import CustomerList from "../component/CustomerList";
import Sidebar from "../component/AdminEvent/Sidebar";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <Header/>
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
  );
}
