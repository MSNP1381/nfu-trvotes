import React, { useCallback, useEffect, useState } from "react";
import { getColor, get_sessions } from "../../Api/api";
import moment from "jalali-moment";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import "./style.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import MainTableFiltersComponent, {
  FilterType,
} from "./MainTableFilters/MainTableFilters";

export type DataType = {
  id: number;
  title: string;
  against: number;
  favor: number;
  abstaining: number;
  jdate: string;
  votes: number | null;
};

interface IProps {}

export default function MainTableComponent(props: IProps) {
  const navigate = useNavigate();
  const [val, setVal] = useState("");

  const columns: ColumnsType<DataType> = [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "مخالف",
      dataIndex: "against",
      sorter: (a, b) => a.against - b.against,
      render: (text, row) => (
        <span style={{ direction: "ltr" }}>{`(${(
          (row.against / (row.against + row.abstaining + row.favor)) *
          100
        ).toFixed(0)}%) ${row.against}`}</span>
      ),
    },
    {
      title: "موافق",
      dataIndex: "favor",
      sorter: (a, b) => a.favor - b.favor,
      render: (text, row) => (
        <span style={{ direction: "ltr" }}>
          {`(${(
            (row.favor / (row.against + row.abstaining + row.favor)) *
            100
          ).toFixed(0)}%) ${row.favor}`}
        </span>
      ),
    },
    {
      title: "ممتنع",
      dataIndex: "abstaining",
      sorter: (a, b) => a.abstaining - b.abstaining,
      render: (text, row) => (
        <span style={{ direction: "ltr" }}>{`(${(
          (row.abstaining / (row.against + row.abstaining + row.favor)) *
          100
        ).toFixed(0)}%) ${row.abstaining}`}</span>
      ),
    },
    {
      title: "تاریخ",
      dataIndex: "jdate",
      defaultSortOrder: "descend",
      sorter: (a, b) =>{
        if (a.jdate>b.jdate) return 1;
        if (a.jdate==b.jdate)return 0;
        return -1;
      }
    },
    {
      title: "تعداد آرا",
      dataIndex: "votes",
      sorter: (a, b) => a.abstaining - b.abstaining,
      render: (text, record) =>
        record.abstaining + record.against + record.favor,
    },
  ];

  const doFilterData = (x?: FilterType) => {
    let fil = filters;
    if (!(x == null || x == undefined)) fil = x;
    console.log(fil);
    let d2 = data.filter((w) => {
      // let d = moment(w.jdate, "jYYYY/jMM/jDD").valueOf();
      let d = w.jdate;

      let tmp = [
        fil.title == "" ? true : w.title.includes(fil.title),
        fil.startDate == "" ? true : fil.startDate <= d,
        fil.endDate == "" ? true : fil.endDate >= d,
      ];
      // console.log( tmp, filters,d);
      return tmp[0] && tmp[1] && tmp[2];
    });
    console.log(d2);
    setFData(d2);
  };
  useEffect(() => {
    const base_from = moment("1401/12/21", "jYYYY/jMM/jDD").toISOString();
    get_sessions(base_from, moment().toISOString()).then((x) => {
      setData(x.data);
      setFilters({
        title: "",
        startDate: base_date,
        endDate: n,
      });
      doFilterData({
        title: "",
        startDate: base_date,
        endDate: n,
      });
    });
    console.log(base_from);
  }, []);

  const [data, setData] = useState(new Array<DataType>());
  const [fdata, setFData] = useState(new Array<DataType>());

  let base_date = "1401/12/21";
  const now_ = moment().format("jYYYY/jMM/jDD");
  let n = now_;
  const [filters, setFilters] = useState({
    title: "",
    startDate: base_date,
    endDate: n,
  } as FilterType);

  useEffect(() => {
    doFilterData();
  }, [filters]);

  return (
    <div>
      <MainTableFiltersComponent
        setData={setFilters}
      ></MainTableFiltersComponent>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={fdata}
        pagination={{ position: ["bottomCenter"] }}
        bordered
        className="striped"
        loading={data.length == 0}
        rowKey={"id"}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => navigate("/session/" + record.id),
          };
        }}
      />
    </div>
  );
}
