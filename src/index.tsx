import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import 'antd-css-utilities/utility.min.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);



root.render(
  <ConfigProvider direction="rtl">
    <App/>
  </ConfigProvider>
);
