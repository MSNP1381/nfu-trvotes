import React from "react";
import MainTableComponent from "./Components/MainTable/MainTable";
import "antd/dist/antd.min.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SessionPageComponent from "./Components/SessionPage/SessionPage";
import MemberPageComponent from "./Components/MemberPage/MemberPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainTableComponent />,
    },    {
      path: "/session/:id",
      element: <SessionPageComponent  />,
    },
    {
      path: "/member/:id",
      element: <MemberPageComponent  />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
