import { Button, Col, ConfigProvider, Input, Row, Space, message } from "antd";
import Search, { SearchProps } from "antd/lib/input/Search";
import moment from "jalali-moment";
import "./style.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export type FilterType = {
  title: string;
  startDate: string;
  endDate: string;
};

interface IProps {
  setData: React.Dispatch<React.SetStateAction<FilterType>>;
}

moment.locale("fa");

export default function MainTableFiltersComponent({ setData }: IProps) {
  let base_date = "1401/12/21";
  let last_month = moment().add(-1,'jMonth').format("YYYY/MM/DD");
  let base_date_ = moment(base_date, "YYYY/MM/DD").toDate();
  const now_ = moment().format("YYYY/MM/DD");
  var n = moment().toDate();
  const [stats, setstats] = useState(['','']);
  const [messageApi, contextHolder] = message.useMessage();
  const dateFromRef = useRef({}as any);
  const dateToRef = useRef({} as any);

  const onSearch: SearchProps["onSearch"] = (value: string, _e: any) =>
    setData((data: any) => {
      console.log(value, _e);
      return { ...data, title: value };
    });
  function validate(): boolean {
    if (dateFromRef.current ==null ||  dateToRef.current==null) return false;
    console.log(dateFromRef.current.input.value,dateToRef.current.input.value);
    let date='';
    return false
    const dates = date.split("/");
    if (dates.length != 3) return false;
    try {
      let m = moment(date, "YYYY/MM/DD").toDate();
      if (m >= base_date_ && m <= n) return true;
    } catch (e) {
      return false;
    }
    return false;
  }

  // function   onChange(){(v: any) => {
  //     console.log(v);
  //     if (v == null) {
  //         setData((x) => {
  //             return { title: x.title, startDate: base_date, endDate: n };
  //         });
  //     }
  //     const m1 = v[0]["$jM"] + 1;
  //     const m2 = v[1]["$jM"] + 1;
  //     let startDate = `${v[0]["$jy"]}/${m1 < 10 ? "0" + m1 : m1}/${v[0]["$jD"] < 10 ? "0" + v[0]["$jD"] : v[0]["$jD"]
  //         }`;
  //     let endDate = `${v[1]["$jy"]}/${m2 < 10 ? "0" + m2 : m2}/${v[1]["$jD"] < 10 ? "0" + v[1]["$jD"] : v[1]["$jD"]
  //         }`;
  //     console.warn(
  //         v,
  //         startDate,
  //         endDate,
  //         startDate >= base_date,
  //         endDate <= n
  //     );
  //     if (!(startDate >= base_date && endDate <= n))
  //         messageApi.error(
  //             "بازه زمانی 1401/12/21 تا امروز معتبر است",
  //             1500
  //         );
  //     setData((x) => {
  //         console.error({ title: x.title, startDate, endDate });
  //         return { title: x.title, startDate, endDate };
  //     });
  // }}
  return (
    <>
      {contextHolder}
      <Row gutter={24} style={{ padding: "10px 1% " }}>
        <Col>
          <Search
            style={{ borderRadius: "12px" }}
            placeholder="جستجو عنوان"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col>
          <Space.Compact>
            <Input ref={dateFromRef} placeholder="از تاریخ" defaultValue={last_month} />
          </Space.Compact>
          <Space.Compact>
            <Input ref={dateToRef} placeholder="تا تاریخ" defaultValue={now_}  />
          </Space.Compact>
          <Space.Compact>
            <Button type="primary" onClick={(x) => validate()}>
              برو
            </Button>
          </Space.Compact>
        </Col>
        <Col>
          <Link to={"/members"}>
            <Button>صفحه اعضا</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}
