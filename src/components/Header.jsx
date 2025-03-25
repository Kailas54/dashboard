import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const Header = ({ category, title }) => {
  const { currentMode } = useStateContext();
  return (
    <div className="mb-10">
      <p className="text-lg text-gray-400">{category}</p>
      <p className={`text-3xl font-extrabold tracking-tight ${currentMode === 'Dark' ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </p>
    </div>
  );
};

export default Header;