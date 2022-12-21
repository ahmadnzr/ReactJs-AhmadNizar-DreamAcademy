import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUser = async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/users",
    });
    setUsers(res.data);
    setSelectedUser(res.data[0]);
  };

  const handleSelectUser = (userId) => {
    const user = users.find((user) => user.id === userId);

    setSelectedUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ users, selectedUser, handleSelectUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
