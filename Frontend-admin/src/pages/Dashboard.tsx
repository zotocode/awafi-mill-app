import Navbar from '../components/Navbar';
import Table from '../components/Table';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {/* Add margin to ensure the content starts below the navbar */}
      <div className="p-4 sm:ml-64 mt-16"> {/* Adjust the top margin based on the height of your navbar */}
        {/* Your content here */}
        <Table />
      </div>
    </>
  );
};

export default Dashboard;
