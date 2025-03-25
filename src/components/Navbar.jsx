import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiPower } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import adminpic from '../data/adminpic.jpg';
import { UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div className="flex items-center gap-2 p-1 rounded-lg">
            <img
              className="rounded-full w-8 h-8"
              src={adminpic}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 font-bold ml-1 text-14">
                Admin 
              </span>
            </p>
          </div>
        </TooltipComponent>
        <TooltipComponent content="Logout" position="BottomCenter">
          <button
            className="ml-4 p-2 text-red-500 hover:text-red-600 rounded-full"
            onClick={() => window.location.href = '/'}
          >
            <FiPower className="text-xl" />
          </button>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;