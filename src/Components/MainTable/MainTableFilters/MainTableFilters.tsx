import { Col, Row, message } from "antd";
import Search, { SearchProps } from "antd/lib/input/Search";
import { DatePicker } from "zaman";
import moment from "jalali-moment";
import "./style.css";
import { useState } from "react";
export type FilterType = {
  title: string;
  startDate: number;
  endDate: number;
};
interface IProps {
  setData: React.Dispatch<React.SetStateAction<FilterType>>;
}
export default function MainTableFiltersComponent({ setData }: IProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [filters, setFilters] = useState({} as FilterType);
  const onSearch: SearchProps["onSearch"] = (value: string, _e: any) =>
    setData((data: any) => {
      return { ...data, title: value };
    });
  return (
    <Row gutter={24} style={{ padding: "10px 1% " }}>
      {contextHolder}
      <Col>
        <Search
          style={{ borderRadius: "12px" }}
          placeholder="جستجو عنوان"
          onSearch={onSearch}
          // style={{ width: 200 }}
          enterButton
        />
      </Col>
      <Col>
        <div className="libWrapper">
          <DatePicker
            direction="ltr"
            range
            round="x2"
            accentColor="#6374ae"
            inputAttributes={{
              placeholder: "تاریخ شروع و پایان",
            }}
            position="center"
            from={new Date("2023/3/12")}
            to={new Date()}
            onChange={({ from, to }: any) => {
              let base_from = moment("1401/12/21", "jYYYY/jMM/jDD");
              let base_to = moment();
              console.log({
                f:from.valueOf(),
                t:to.valueOf(),
                bf:base_from.valueOf(),
                bt:base_to.valueOf()
              });

              if (!(from.valueOf() >= base_from.valueOf() && to.valueOf() <= base_to.valueOf())) {
                messageApi.open({
                  type: "error",
                  content: "بازه زمانی از 1401/12/21 تا امروز معتبر است",
                });
                return;
              }
              setData((d: any) => {
                return { ...d, from: from.valueOf(), to: to.valueOf() };
              });
            }}
          />
        </div>
      </Col>
    </Row>
  );
}
