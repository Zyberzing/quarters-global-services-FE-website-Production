"use client"
import DashboardLayout from "@/layout/DashboardLayout";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdTrash, IoMdEye } from "react-icons/io";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("orders");

  const orders = [
    {
      id: "AID1213131",
      service: "Visa",
      type: "Renew Visa",
      date: "12/05/25",
      status: "In Process",
    },
    {
      id: "AID1213131",
      service: "Passport",
      type: "Passport",
      date: "12/05/25",
      status: "In Process",
    },
  ];
  return (
    <DashboardLayout>
      <div className="min-h-screen  py-10 px-6">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Orders", value: "0" },
            { title: "Visas", value: "0" },
            { title: "Passports", value: "0" },
            { title: "Total", value: "$156" },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-indigo-50 border rounded-lg p-4 text-center"
            >
              <h4 className="text-gray-600 text-sm mb-2">{card.title}</h4>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Personal Details */}
        <div className="bg-white border rounded-lg mb-6 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Your Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">First Name</label>
              <input  className="w-full border rounded-md p-2" value="John" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Last Name</label>
              <input className="w-full border rounded-md p-2" value="Jacob" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input className="w-full border rounded-md p-2" value="johnjacob@gmail.com" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Phone</label>
              <input className="w-full border rounded-md p-2" value="+1 (972)6257112" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Date of Birth</label>
              <input className="w-full border rounded-md p-2" value="02/21/1992" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Country</label>
              <input className="w-full border rounded-md p-2" value="USA" readOnly />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white border rounded-lg mb-8 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Address</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Address</label>
              <input
                className="w-full border rounded-md p-2"
                value="71, Block-1 Marcos St, San Diego, California West"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">City</label>
              <input className="w-full border rounded-md p-2" value="San Diego" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Pincode</label>
              <input className="w-full border rounded-md p-2" value="2516212" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-600">State</label>
              <input className="w-full border rounded-md p-2" value="California" readOnly />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 font-medium ${activeTab === "orders"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
              }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`px-4 py-2 font-medium ${activeTab === "docs"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
              }`}
          >
            Uploaded Documents
          </button>
        </div>

        {/* Orders Table */}
        {activeTab === "orders" && (
          <div className="bg-white border rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="p-3">Application Number</th>
                  <th className="p-3">Services</th>
                  <th className="p-3">Service Type</th>
                  <th className="p-3">Application Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{o.id}</td>
                    <td className="p-3">{o.service}</td>
                    <td className="p-3">{o.type}</td>
                    <td className="p-3">{o.date}</td>
                    <td className="p-3">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 flex items-center gap-3 text-lg text-gray-600">
                      <IoMdEye className="hover:text-blue-600 cursor-pointer" />
                      <IoMdTrash className="hover:text-red-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* WhatsApp Help */}
        <div className="fixed bottom-6 right-6">
          <a
            href="https://wa.me/"
            target="_blank"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition"
          >
            <FaWhatsapp size={20} />
            <span>Need Help? Chat with us</span>
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
