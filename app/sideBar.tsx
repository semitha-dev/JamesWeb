import Link from 'next/link';
import React from 'react';

export const SideBar = () => {
  return (
    <div className="flex flex-col justify-start items-start h-full bg-gray-100 p-4 text-black">
      <Link className="bg-white m-2 mb-4 p-2 rounded shadow hover:bg-gray-200 transition duration-200" href="/">
        Home
      </Link>
      <Link className="bg-white m-2 p-2 rounded shadow hover:bg-gray-200 transition duration-200" href="/CreateNewPost">
        Create
      </Link>
    </div>
  );
};
