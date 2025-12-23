"use client";

import React from "react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    form?.reset();
  };

  return (
    <button 
        type="reset" 
        onClick={reset}
        className="search-btn cursor-pointer flex justify-center items-center bg-black w-[45px] h-[45px] p-2 rounded-full text-white text-lg">
      <Link href="/">
        <FaXmark />
      </Link>
    </button>
  );
};

export default SearchFormReset;
