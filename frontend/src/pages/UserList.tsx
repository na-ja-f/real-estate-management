import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import { getUsers } from "../services/api/apiMethods";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const UserList: React.FC = () => {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  console.log("user", user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          setUsers(data.users);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, []);
  return (
    <div className="p-6 w-full">
      {user.role == "Admin" ? (
        <UserTable users={users} />
      ) : (
        <div className="h-full w-full flex justify-center items-center text-3xl font-bold underline">
          <h1>View Restricted (Only For Admin)</h1>
        </div>
      )}
    </div>
  );
};

export default UserList;
