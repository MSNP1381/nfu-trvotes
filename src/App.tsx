import MainTableComponent from "./Components/MainTable/MainTable";
import "antd/dist/antd.min.css";
import { ConfigProvider, Layout } from "antd";
import fa_IR from "antd/es/locale/fa_IR";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SessionPageComponent from "./Components/SessionPage/SessionPage";
import MemberPageComponent from "./Components/MemberPage/MemberPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import AllMembersComponent from "./Components/AllMembers/AllMembers";
import { Content, Footer } from "antd/lib/layout/layout";
import Link from "antd/lib/typography/Link";
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
    <Layout>
      <Content>

      <RouterProvider router={router} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
<Link href="https://www.linkedin.com/in/msnp1381/" style={{paddingLeft:"1em",paddingRight:"1em"}} >
  <img src="data:image/png;base64,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" alt="msnp " style={{width:"1.5em"}}/>

        محمد صادق نعمت پور 
  </Link>
        <br/>
        <Link href="http://azmaa.net/" target="_blank">
        جنبش ازما
      </Link>
      </Footer>
    </Layout>
  );
}
