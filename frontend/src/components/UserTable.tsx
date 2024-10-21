import React from "react";
import TableRow from "./TableRow";

interface Users {
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

interface UserTableProps {
  users: Users[];
}
const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-6 text-center">Photo</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((client) => (
            <TableRow
              key={client.email}
              name={client.name}
              email={client.email}
              role={client.role}
              isBlocked={client.isBlocked}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Previous</button>
        <span>Page 1 of 1</span>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Next</button>
      </div>
    </div>
  );
};

export default UserTable;
