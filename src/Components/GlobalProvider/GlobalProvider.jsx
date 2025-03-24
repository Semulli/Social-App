import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
export const context = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { fullName: "", img: "", desc: "" };

  const [user, setUser] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <context.Provider
      value={{
        user,
        setUser,
        darkMode,
        setDarkMode,
        show,
        setShow,
        errors,
        setErrors,
        formData,
        setFormData,
        initialState,
        searchQuery,
        onSearch,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </context.Provider>
  );
};

export const useData = () => {
  return React.useContext(context);
};
