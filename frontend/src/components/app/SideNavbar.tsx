import {
  Bell,
  Boxes,
  CreditCard,
  FileUser,
  House,
  LandPlot,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/reducers/authSlice";

const SideNavbar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <nav className=" text-black w-64 p-6 relative">
      <div className="flex flex-col">
        {/* Dashboard Title */}
        <h1 className="text-xl font-bold mb-8">Real Estate Management</h1>

        {/* Dashboard Link */}
        <Link
          to="/"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <House /> Dashboard
        </Link>

        {/* user-list Link */}
        <Link
          to="/user-list"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <Users /> User List
        </Link>

        {/* properties Link */}
        <Link
          to="/properties"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <LandPlot /> Properties
        </Link>

        {/* owners Link */}
        <Link
          to="/owners-list"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <FileUser /> Owners
        </Link>

        {/* units Link */}
        <Link
          to="/units"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <Boxes /> Units
        </Link>

        {/* payments Link */}
        <Link
          to="/payments"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <CreditCard /> Payments
        </Link>

        {/* notifications Link */}
        <Link
          to="/notifications"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <Bell /> Notifications
        </Link>

        {/* settings Link */}
        <Link
          to="/settings"
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2"
        >
          <Settings /> Settings
        </Link>

        {/* settings Link */}
        <div
          className="hover:text-blue-900 py-2 font-medium flex gap-2 mt-2 absolute bottom-8 cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          <LogOut /> Logout
        </div>

        {/* Sales & Leasing Dropdown */}
        {/* <div className="py-2">
          <button
            onClick={() => setIsSalesOpen(!isSalesOpen)}
            className="w-full text-left"
          >
            Properties
          </button>
          {isSalesOpen && (
            <div className="ml-4 mt-2">
              <Link
                to="/properties/sales"
                className="block py-1 hover:text-blue-900"
              >
                Sales
              </Link>
              <Link
                to="/properties/leasing"
                className="block py-1 hover:text-blue-900"
              >
                Leasing
              </Link>
            </div>
          )}
        </div> */}
      </div>
    </nav>
  );
};

export default SideNavbar;
