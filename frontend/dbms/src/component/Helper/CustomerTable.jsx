import React, { useEffect, useState } from "react";
import Axios from "../../Axios/Axios";
import Modal from "react-modal";
const CustomerTable = ({ customers }) => {
    const [selectedForRemoval, setselectedForRemoval] = useState(0);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [selectedForRemovalName, setselectedForRemovalName] = useState("");
    const RemoveEntry = () => [console.log(selectedForRemoval)];
    return (
      <div className="px-4 py-5 bg-gray-50">
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-50 uppercase">
            <tr>
              <th className="px-2 py-2">Customer_id</th>
              <th className="px-2 py-2">Customer_name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Address</th>
              <th className="px-2 py-2">City</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              return (
                <tr key={customer.id_no} className="bg-white border-b">
                  <td className="px-2 py-2">{customer.id_no}</td>
                  <td className="px-2 py-2">
                    {customer.fname} {customer.mname} {customer.lname}{" "}
                  </td>
                  <td className="px-2 py-2">{customer.email}</td>
                  <td className="px-2 py-2">{customer.address}</td>
                  <td className="px-2 py-2">{customer.city}</td>
                  <td>
                    <button
                      onClick={() => {
                        setselectedForRemoval(customer.id_no);
                        setselectedForRemovalName(
                          customer.fname +
                            " " +
                            customer.mname +
                            " " +
                            customer.lname
                        );
                        setopenDeleteModal(true);
                      }}
                      className="px-2 py-2 rounded-md hover:bg-red-600 hover:text-white hover:rounded-lg hover:drop-shadow-lg hover:-translate-y-1 hover:scale-120 transition-all duration-300 "
                    >
                      Remove
                    </button>
                  </td>
                  <Modal
                    isOpen={openDeleteModal}
                    onRequestClose={() => setopenDeleteModal(false)}
                    className="bg-white p-5 rounded-xl w-96 h-96 mx-auto"
                  >
                    <div className="flex  flex-col border-2 px-5 py-5 rounded-lg gap-3">
                      <h1>
                        Are you sure you want to delete {selectedForRemovalName}?
                      </h1>
                      <button
                        onClick={() => {
                          setopenDeleteModal(false);
                          RemoveEntry();
                        }}
                        className="   px-4 py-2 rounded-md hover:bg-red-600  hover:text-white hover:rounded-lg hover:drop-shadow-lg hover:-translate-y-1 hover:scale-120 transition-all duration-300 "
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setopenDeleteModal(false)}
                        className=" bg-blue-600  px-2 py-2 rounded-md  hover:text-white hover:rounded-lg hover:drop-shadow-lg hover:-translate-y-1 hover:scale-120 transition-all duration-300 "
                      >
                        No
                      </button>
                    </div>
                  </Modal>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

export default CustomerTable
  