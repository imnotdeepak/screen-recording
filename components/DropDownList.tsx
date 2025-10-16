"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const DropDownList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Get current filter from URL or default to "Most Recent"
  const currentFilter = searchParams.get("filter") || "Most Recent";
  const [selectedOption, setSelectedOption] = useState(currentFilter);

  // Sync selected option with URL changes
  useEffect(() => {
    setSelectedOption(currentFilter);
  }, [currentFilter]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Create new URL with the selected filter
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", option);
    router.push(`/?${params.toString()}`);
  };

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
          <span>{selectedOption}</span>
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
          {["Most Recent", "Most Viewed"].map((option) => (
            <li
              key={option}
              className="list-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownList;
