import React from "react";

interface PaymentItemProps {
  paymentId: string;
}

const PaymentItem: React.FC<PaymentItemProps> = ({ paymentId }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <span>{paymentId}</span>
      <button className="text-gray-500">...</button>
    </div>
  );
};

export default PaymentItem;
