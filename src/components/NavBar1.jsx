import React, { useState, useRef, useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

const NavBar1 = ({ navigate }) => {
  
  return (
    <div className='flex p-2 px-5 gap-2 items-center sticky bg-white shadow-2xl h-[9%] z-50'>
      <h1 className='text-[#3450d7] text-2xl md:text-4xl '><FaArrowLeft className='cursor-pointer inline' onClick={() => navigate('/')}/> </h1>
      <h1 className='text-[#3450d7] text-2xl md:text-4xl '>Saved News </h1>


      

      
    </div>
  );
};

export default NavBar1;
