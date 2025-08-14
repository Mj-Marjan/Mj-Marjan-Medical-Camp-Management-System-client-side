import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://medical-camp-server-liart.vercel.app/registrations?email=${user.email}`)
        .then((res) => res.json())
        .then((camps) => {
          const paidCamps = camps.filter(camp => camp.paymentStatus === "paid");

          const formatted = paidCamps.map(camp => ({
            name: camp.campName,
            fees: camp.fees
          }));

          setData(formatted);
        });
    }
  }, [user?.email]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Analytics of Your Registered Camps</h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="fees" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No data to show. You haven’t paid for any camp yet.</p>
      )}
    </div>
  );
};

export default Analytics;
