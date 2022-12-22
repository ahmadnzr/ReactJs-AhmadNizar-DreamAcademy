import React from "react";
import { Route, Routes } from "react-router-dom";

import UserContextProvider from "./contexts/UserContext";
import WrapperLayout from "./layouts/WrapperLayout";

import Home from "./pages/Home";
import Users from "./pages/Users";
import PostDetail from "./pages/PostDetail";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<WrapperLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Home />} />
          <Route path="posts/:postId" element={<PostDetail />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
