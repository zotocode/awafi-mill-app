import Table from '../components/Table';


const UserManagementPage = () => {
  const userData = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Michael Brown', email: 'michael@example.com', role: 'User' },
  ];

  const userColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
  ];

  const userActions = (row: { [key: string]: any }) => (
    <>
      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> |
      <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
    </>
  );

  return (
    <>
 
    
    <div className="p-4 sm:ml-64 mt-16">
      <Table data={userData} columns={userColumns} actions={userActions} />
    </div>
    </>
  );
};

export default UserManagementPage;
