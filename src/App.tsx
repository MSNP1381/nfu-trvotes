import MainTableComponent from "./Components/MainTable/MainTable";
import "antd/dist/antd.min.css";
import { ConfigProvider } from "antd";
import fa_IR from "antd/es/locale/fa_IR";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SessionPageComponent from "./Components/SessionPage/SessionPage";
import MemberPageComponent from "./Components/MemberPage/MemberPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import AllMembersComponent from "./Components/AllMembers/AllMembers";
var calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);
dayjs.extend(jalaliday);
dayjs().calendar("jalali");
export default function App() {
  dayjs.extend(calendar);
  dayjs.extend(jalaliday);
  dayjs().calendar("jalali");
  const router = createBrowserRouter([
    { path : "/", element: <MainTableComponent /> },
    { path : "/session/:id", element: <SessionPageComponent /> },
    { path : "/member/:id", element: <MemberPageComponent /> },
    { path : "/members/", element: <AllMembersComponent /> },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
