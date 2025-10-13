"use client";
import Image from "next/image";
import React, { useState } from "react";

const DropDownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="filter-trigger cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <figure>
          <Image
            src="/assets/icons/hamburger.svg"
            alt="menu"
            width={14}
            height={14}
          />
          <span>Most Recent</span>
        </figure>
        <Image
          src="/assets/icons/arrow-down.svg"
          alt="arrow-down"
          width={20}
          height={20}
        />
      </div>
      {isOpen && (
        <ul className="dropdown">
          {["Most recent", "Most liked"].map((option) => (
            <li key={option} className="list-item">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownList;
