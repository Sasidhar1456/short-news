import React, { useState, useRef, useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = ({ handleLogout,navigate }) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const changeOpened = () => {
    setIsOpened((prev) => !prev);
  };

  const userName = localStorage.getItem('userName') || 'User';

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='flex p-2 px-5 justify-between items-center sticky bg-white shadow-2xl h-[9%] z-50'>
      <h1 className='text-[#3450d7] text-2xl md:text-4xl '>ShortNews</h1>

      {/* Toggle User Area */}
      <div
        ref={toggleRef}
        onClick={changeOpened}
        className='flex justify-center items-center gap-2 md:text-lg hover:underline hover:decoration-[#3450d7] cursor-pointer'
      >
        <p className='text-[#3450d7]'>{userName}</p>
        <FaRegUserCircle className='text-[28px] md:text-[38px] text-[#3450d7]' />
      </div>

      {/* Dropdown */}
      {isOpened && (
        <div
          ref={dropdownRef}
          className='absolute top-14 right-4 bg-white rounded shadow-md text-[#3450d7] text-sm p-4 flex flex-col justify-center gap-4 animate-fade-in z-50'
        >
          <p onClick={() => navigate('/saved-news')}  className='cursor-pointer hover:underline hover:decoration-[#3450d7] select-none'>
            Saved News
          </p>

          <p
            onClick={handleLogout}
            className='cursor-pointer hover:underline hover:decoration-[#3450d7] select-none '
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default NavBar;
