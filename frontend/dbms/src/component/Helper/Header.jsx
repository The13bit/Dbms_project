import React from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
const Header = ({ fetchData, showCustomer, showWareHouse, showProduct }) => {
  return (
    <>
      <div className="flex flex-col fixed top-0 w-20 bg-slate-600 h-full left-0 ">
        <div
          onClick={() => {
            showCustomer(true);
            showWareHouse(false);
            showProduct(false);
          }}
        >
          
          <SideBarIcon Icon={<FaUser size={32} />} text="Users" />
        </div>
        <div onClick={() => {
            showCustomer(false);
            showWareHouse(true);
            showProduct(false);
          }}>
        <SideBarIcon Icon={<FaStore size={32} />} text="WareHouses" />
        </div>
        <div onClick={() => {
            showCustomer(false);
            showWareHouse(false);
            showProduct(true);
          }}>
        <SideBarIcon Icon={<CiBoxList size={32} />} text="Products" />
        </div>
        <div
          onClick={fetchData}
          className=" group relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-slate-100 rounded-lg hover:rounded-3xl transition-all duration-200"
        >
          <MdOutlineRestartAlt
            size={32}
            className=" group-hover:-rotate-[125deg] ease-out transition-all duration-300"
          />
          <span className="group-hover:scale-100 absolute w-auto p-2 m-6 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-150 origin-left scale-0">
            Refresh
          </span>
        </div>
      </div>
    </>
  );
};
const SideBarIcon = ({ Icon, text = "TEst" }) => {
  return (
    <div className=" group relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-slate-100 rounded-lg hover:rounded-3xl transition-all duration-200">
      {Icon}
      <span className="group-hover:scale-100 absolute w-auto p-2 m-6 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-150 origin-left scale-0">
        {text}
      </span>
    </div>
  );
};

export default Header;
