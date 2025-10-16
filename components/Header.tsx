"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import DropDownList from "./DropDownList";
import RecordScreen from "./RecordScreen";

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Get current search query from URL
  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setSearchQuery(currentQuery);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new URL with the search query
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }

    // Reset to page 1 when searching
    params.delete("page");

    router.push(`/?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Auto-reset when search box is completely cleared
    if (value.trim() === "" && searchParams.get("query")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("query");
      params.delete("page"); // Reset to page 1
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <header className="header">
      <section className="header-container">
        <div className="details">
          {userImg && (
            <Image
              src={userImg || "/assets/images/dummy.jpg"}
              alt="user"
              width={66}
              height={66}
              className="rounded-full"
            />
          )}

          <article>
            <p>{subHeader}</p>
            <h1>{title}</h1>
          </article>
        </div>

        <aside>
          <Link href="/upload">
            <Image
              src="/assets/icons/upload.svg"
              alt="upload"
              width={16}
              height={16}
            />
            <span>Upload</span>
          </Link>
          <RecordScreen />
        </aside>
      </section>

      <section className="search-filter">
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for videos, tags, and folders..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={16}
              height={16}
            />
          </button>
        </form>
        <DropDownList />
      </section>
    </header>
  );
};

export default Header;
