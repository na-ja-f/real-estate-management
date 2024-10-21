import React, { useState } from "react";
import { blockUser, changeRole } from "../services/api/apiMethods";
import { toast } from "sonner";

interface TableRowProps {
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  name,
  email,
  role,
  isBlocked,
}) => {
  const [isblocked, setIsblocked] = useState(isBlocked);
  const [changedRole, setChangedRole] = useState(role);

  const onBlockButtonClick = () => {
    blockUser({ email })
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          setIsblocked(!isblocked);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const onRoleChange = () => {
    changeRole({ email })
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          changedRole == "Agent"
            ? setChangedRole("Manager")
            : setChangedRole("Agent");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <tr className="border-t">
      <td className="py-3 px-6 text-center">
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-100 font-semibold text-xl">
          {name.split("")[0]}
        </div>
      </td>
      <td className="py-3 px-6">{name}</td>
      <td className="py-3 px-6">{email}</td>
      <td className="py-3 px-6">{changedRole}</td>
      <td className="py-3 px-6 text-center space-x-2">
        {role != "Admin" && (
          <button
            onClick={onBlockButtonClick}
            className=" text-black border-2 border-black px-4 py-2 rounded hover:text-white hover:bg-black"
          >
            {isblocked == true ? "UnBlock" : "Block"}
          </button>
        )}
        {role != "Admin" && (
          <button
            onClick={onRoleChange}
            className="text-black border-2 border-black hover:text-white hover:bg-black px-4 py-2 rounded"
          >
            Change to {changedRole == "Manager" ? "Agent" : "Manager"}
          </button>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
