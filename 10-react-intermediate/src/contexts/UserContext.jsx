import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/users",
      });
      setData(res.data);
      setSelectedUser(res.data[0]);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSelectUser = (userId) => {
    const user = data.find((user) => user.id === userId);

    setSelectedUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ data, selectedUser, handleSelectUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
