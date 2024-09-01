"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "../utils/api";

const Context = createContext();

export const StateContext = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("login");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.error("No user data found in localStorage");
    }
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(Context);
