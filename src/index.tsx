import ReactDOM from "react-dom";
import App from "./App";
import { ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";


ReactDOM.render(
  <ConfigProvider locale={fa_IR} direction="rtl">

    <App/>

</ConfigProvider>
  ,document.getElementById("root")
);
