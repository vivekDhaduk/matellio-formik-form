import React from "react";
import { useSelector } from "react-redux";
import PrimeDataGrid from "./components/PrimeDataGrid";

export default function UserList() {
  const allUsers = useSelector((state) => state.user.users);
console.log(allUsers,allUsers.length,"allUsers");
  return (
    <div className="w-100 mt-3">
      {allUsers.length > 0 && <PrimeDataGrid allUsers={allUsers} />}
    </div>
  );
}
