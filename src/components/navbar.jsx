import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-leaf-green p-4 shadow-md">
      <div className="flex items-center gap-4">
        <img src=".assets/logo.png" alt="Green Gadgets Logo" className="h-10" />
        <button className="text-white text-lg font-semibold">All Ads</button>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-white text-lg">
          <i className="fas fa-moon"></i>
        </button>
        <button className="bg-deep-green text-white px-4 py-2 rounded flex items-center gap-2">
          <i className="fas fa-plus"></i> Create Post
        </button>
        <img src=".assets/profile.jpg" alt="Profile" className="h-10 w-10 rounded-full border-2 border-white" />
        <button className="text-white text-lg">
          <i className="fas fa-comment-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
