import React, { useEffect, useState } from "react";
import Axios from "../../Axios/Axios";
import Modal from "react-modal";
import { IoMdAdd } from "react-icons/io";
const Productadder = ({ closeModal, warehouses, products }) => {
    const [name, setname] = useState("");
    const [price, setprice] = useState(0);
    const [warehouseName, setwarehouseName] = useState("");
    const [stock, setstock] = useState(0);
    const SubmitProduct = async () => {
      try {
        await Axios.post("/insert_product", {
          name: name,
          price: price,
          warehouseName: warehouseName,
          stock: stock,
        });
        closeModal(false);
      } catch (e) {
        console.log(e);
      }
    };
    const test = () => {
      console.log(name, price, warehouseName, stock);
    };
  
    return (
      <div className="px-4 py-5 bg-gray-50 max-w-lg w-[36rem]">
        <form className="max-w-md mx-auto">
          <div className="grid md:grid-cols-2 md:gap-6">
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
                Product Name
              </label>
            </div>
            
             
            
            <div className="relative z-0 w-full mb-5 group flex justify-between">
            <label className="translate-y-3">OR</label>
              <select className=" bg-white border p-2 rounded-lg w-auto">
                <option>Select Product</option>
                {products.map((product) => {
                  return (
                    <option key={product.p_id} value={product.name}>
                      {product.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => setprice(e.target.value)}
                type="text"
                className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group flex justify-end">
            
              <select
                required
                onChange={(e) => setwarehouseName(e.target.value)}
                className="bg-white border rounded-md p-2 w-auto"
              >
                <option>Select Warehouse</option>
                {warehouses.map((warehouse) => {
                  return (
                    <option key={warehouse.w_id} value={warehouse.name}>
                      {warehouse.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => setstock(e.target.value)}
              type="text"
              className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Stock
            </label>
          </div>
  
          <button
            onClick={(e) => {
              e.preventDefault();
              SubmitProduct();
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };
  const ProductTable = ({ products, warehouses }) => {
    const [selectedForRemoval, setselectedForRemoval] = useState(0);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [selectedForRemovalName, setselectedForRemovalName] = useState("");
    const [openProductModal, setopenProductModal] = useState(false);
    const [openSpecificDeleter,setopenSpecificDeleter]=useState(false)
    const [availInWare,setavailInWare]=useState([])
    const [selectedWarehouse,setselectedWarehouse]=useState(0)
  
    useEffect(()=>{
      if(selectedForRemoval){
        
        fetch_product_warehouse()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedForRemoval,selectedForRemovalName])
    const RemoveEntry = async () => {
      try {
        await Axios.post("/delete_product", { p_id: selectedForRemoval });
      } catch (e) {
        console.log(e);
      }
    };
    const RemoveSpecific=async()=>{
      try{
        await Axios.post("/remove_from_warehouse", { p_id: selectedForRemoval,w_id:selectedWarehouse });
      }catch(e){
        console.log(e);
      }
    }
    const fetch_product_warehouse=async()=>{
      try{
        await Axios.post("/fetch_warehouse_product",{
          p_id:selectedForRemoval
  
        }).then((res)=>{
            setavailInWare(res.data.data)
        })
      }catch(e){
        console.log(e)
      }
    }
  
    return (
      <div className="flex flex-col">
        <div className=" flex justify-end ">
          <button
            onClick={() => setopenProductModal(true)}
            className="px-3 py-3  rounded-xl  transition-all bg-blue-400 duration-150 hover:rounded-full hover:bg-gray-100 hover:text-blue-600"
          >
            <IoMdAdd />
          </button>
          <Modal
            isOpen={openProductModal}
            onRequestClose={() => setopenProductModal(false)}
            className="flex justify-center bg-white p-5 rounded-xl w-[36rem] h-96 mx-auto"
          >
            <Productadder
              closeModal={setopenProductModal}
              warehouses={warehouses}
              products={products}
            />
          </Modal>
        </div>
  
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-50 uppercase">
            <tr>
              <th className="px-2 py-2">Product_id</th>
              <th className="px-2 py-2">Product_name</th>
              <th className="px-2 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.p_id} className="bg-white border-b">
                  <td className="px-2 py-2">{product.p_id}</td>
                  <td className="px-2 py-2">{product.name}</td>
                  <td className="px-2 py-2">{product.price}</td>
  
                  <td>
                    <button
                      onClick={() => {
                        setselectedForRemoval(product.p_id);
                        setselectedForRemovalName(product.name);
                        setopenDeleteModal(true);
                      }}
                      className="px-2 py-2 rounded-md hover:bg-red-600 hover:text-white hover:rounded-lg hover:drop-shadow-lg hover:-translate-y-1 hover:scale-120 transition-all duration-300 "
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>{
                      setselectedForRemoval(product.p_id);
                      setselectedForRemovalName(product.name);
                      
                      setopenSpecificDeleter(true);
                      
                    }} className="px-2 py-2 rounded-md hover:bg-red-600 hover:text-white hover:rounded-lg hover:drop-shadow-lg hover:-translate-y-1 hover:scale-120 transition-all duration-300 ">
                      Remove From
                    </button>
                  </td>
                  <Modal
                    isOpen={openSpecificDeleter}
                    onRequestClose={() => setopenSpecificDeleter(false)}
                    className="bg-white p-5 rounded-xl w-96 h-96 mx-auto"
                  >
                    <div className="flex  flex-col border-2 px-5 py-5 rounded-lg gap-3">
                      <h1>
                        Are you sure you want to delete {selectedForRemovalName}?
                      </h1>
                      <select onChange={(e)=>setselectedWarehouse(e.target.value)} className="bg-white p-2">
                      <option >Select Warehouse</option>
                        {
                          
                          availInWare.map((ware)=>{
                            return(
                              <option key={ware.w_id} value={ware.w_id}>{ware.name}</option>
                            )
                          })
                        }
                      </select>
                      <button
                        onClick={() => {
                          setopenSpecificDeleter(false);
                         RemoveSpecific();
                        }}
                        className="   px-4 py-2 rounded-md hover:bg-red-600  hover:text-white hover:rounded-lg hover:drop-shadow-lg hover:-translate-y-1 hover:scale-120 transition-all duration-300 "
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setopenSpecificDeleter(false)}
                        className=" bg-blue-600  px-2 py-2 rounded-md  hover:text-white hover:rounded-lg hover:drop-shadow-lg hover:-translate-y-1 hover:scale-120 transition-all duration-300 "
                      >
                        No
                      </button>
                    </div>
                  </Modal>
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

  export default ProductTable