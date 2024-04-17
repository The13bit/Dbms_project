import React, { useEffect, useState } from "react";
import Axios from "../../Axios/Axios";
import Modal from "react-modal";
import { IoMdAdd } from "react-icons/io";
const WareHosueadder = ({ closeModal }) => {
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [locality, setlocality] = useState("");
    const SubmitWarehouse = async () => {
      console.log(name, address, locality);
      try {
        await Axios.post("/add_warehouse", {
          name: name,
          address: address,
          locality: locality,
        });
        closeModal(false);
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <div className="px-4 py-5 bg-gray-50 max-w-lg">
        <form className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => setname(e.target.value)}
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
  
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => setaddress(e.target.value)}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address{" "}
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => setlocality(e.target.value)}
                type="text"
                name="floating_company"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Locality
              </label>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              SubmitWarehouse();
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };
const WareHouseTable = ({ warehouses }) => {
    const [openWarehouseModal, setopenWarehouseModal] = useState(false);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [selectedForRemoval, setselectedForRemoval] = useState(0);
    const [selectedForRemovalName, setselectedForRemovalName] = useState("");
    const removeEntry = async () => {
      console.log(selectedForRemoval);
      try {
        await Axios.post("/remove_warehouse", { w_id: selectedForRemoval });
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <div className="flex flex-col">
        <div className=" flex justify-end ">
          <button
            onClick={() => setopenWarehouseModal(true)}
            className="  px-3 py-3  rounded-xl  transition-all bg-blue-400 duration-150 hover:rounded-full hover:bg-gray-100 hover:text-blue-600 "
          >
            <IoMdAdd />
          </button>
          <Modal
            isOpen={openWarehouseModal}
            onRequestClose={() => setopenWarehouseModal(false)}
            className="bg-white p-5 rounded-xl w-96 h-96 mx-auto"
          >
            <WareHosueadder closeModal={setopenWarehouseModal} />
          </Modal>
        </div>
  
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-50 uppercase">
            <tr>
              <th className="px-2 py-2">Warehouse_id</th>
              <th className="px-2 py-2">Warehouse_name</th>
              <th className="px-2 py-2">Location</th>
              <th className="px-2 py-2">City</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => {
              return (
                <tr key={warehouse.w_id} className="bg-white border-b">
                  <td className="px-2 py-2">{warehouse.w_id}</td>
                  <td className="px-2 py-2">{warehouse.name}</td>
                  <td className="px-2 py-2">{warehouse.address}</td>
                  <td className="px-2 py-2">{warehouse.locality}</td>
                  <td>
                    <button
                      onClick={() => {
                        setselectedForRemoval(warehouse.w_id);
                        setselectedForRemovalName(warehouse.name);
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
                          removeEntry();
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

export default WareHouseTable