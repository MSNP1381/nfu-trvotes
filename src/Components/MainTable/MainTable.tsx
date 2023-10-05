import React, { useCallback, useEffect, useState } from "react";
import { getColor, get_sessions } from "../../Api/api";
import moment from "jalali-moment";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import "./style.css";
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
      sorter: (a, b) =>
        parseInt(a.jdate.replace("/", "")) - parseInt(b.jdate.replace("/", "")),
    },
    {
      title: "تعداد آرا",
      dataIndex: "votes",
      sorter: (a, b) => a.abstaining - b.abstaining,
      render: (text, record) =>
        record.abstaining + record.against + record.favor,
    },
  ];
  useEffect(() => {
    const base_from = moment("1401/12/21", "jYYYY/jMM/jDD").toISOString();

    get_sessions(base_from, moment().toISOString()).then((x) => {
      setData(x.data);
    });
    console.log(base_from);
  }, []);

  const [data, setData] = useState(new Array<DataType>());
  const [fdata, setFData] = useState(new Array<DataType>());
  const [filters, setFilters] = useState({
    title: "",
    startDate: -1,
    endDate: -1,
  } as FilterType);

  useEffect(() => {
    console.log(filters);
    let d2 = data.filter((w) => {
      let d = moment(w.jdate, "jYYYY/jMM/jDD").valueOf();

      let tmp =
        [filters.title == ""
          ? true
          : w.title.includes(filters.title) , filters.startDate <= 0
          ? true
          : filters.startDate >= d , filters.endDate <= 0
          ? true
          : filters.endDate <= d];
          console.log(w,tmp,tmp[0]&&tmp[1]&&tmp[2])
      return tmp[0]&&tmp[1]&&tmp[2];
    });
    console.log(d2);
    setFData(d2);
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
