import React, { useState, useRef } from "react";
import styles from "./header.module.css";

import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import { useData } from "../GlobalProvider/GlobalProvider";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const { darkMode, onSearch  } = useData();
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setShowSearch(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleBlur = () => {
    setShowSearch(false);
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);  // Arama kelimesini üst komponentten al
  };

  return (
    <div
      className={`${styles.header} ${darkMode ? styles.dark : styles.light}`}
    >
      <h1>FakeBook</h1>

      <div className={styles.rightPart}>
        {!showSearch && (
          <SearchIcon onClick={toggleSearch} className={styles.searchIcon} />
        )}
        {showSearch && (
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name..."
            className={styles.searchInput}
            onBlur={handleBlur}
            onChange={handleSearch}  // Her değişiklikte handleSearch çağrılır
          />
        )}
        <EmailIcon />
        <img
          src="https://image-processor-storage.s3.us-west-2.amazonaws.com/images/3cf61c1011912a2173ea4dfa260f1108/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
