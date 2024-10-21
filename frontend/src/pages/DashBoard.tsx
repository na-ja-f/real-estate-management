import React from "react";
import StatBox from "../components/StatBox";
import NotificationItem from "../components/NotificationBox";
import TaskItem from "../components/TaskBox";
import PaymentItem from "../components/PaymentBox";
import { FileUser, LandPlot, Users } from "lucide-react";
import GoogleMapComponent from "../components/GoogleMapComponent";

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 w-full pt-10">
      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatBox
          label="Total Owners"
          value={1234}
          icon={<FileUser size={40} />}
        />
        <StatBox
          label="Total Properties"
          value={56}
          icon={<LandPlot size={40} />}
        />
        <StatBox label="Total users" value={4321} icon={<Users size={40} />} />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Notifications */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <NotificationItem message="New client registration" time="2m ago" />
          <NotificationItem message="Payment slip uploaded" time="1h ago" />
          <NotificationItem
            message="Document approval required"
            time="3h ago"
          />
        </div>

        {/* Pending Tasks */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
          <TaskItem label="Review new applications" />
          <TaskItem label="Approve payment slips" />
          <TaskItem label="Update client statuses" />
          <TaskItem label="Send reminder emails" />
        </div>

        {/* Payment Approvals */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Payment Approvals</h2>
          <PaymentItem paymentId="PAY001" />
          <PaymentItem paymentId="PAY002" />
          <PaymentItem paymentId="PAY003" />
        </div>
      </div>
      {/* maps */}
      <GoogleMapComponent
        onLocationSelect={() => {}}
        center={{ lat: 25.276987, lng: 55.296249 }}
      />
    </div>
  );
};

export default Dashboard;
