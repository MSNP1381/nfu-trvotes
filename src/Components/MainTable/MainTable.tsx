import React, { useEffect, useState } from "react";
import { getColor, get_sessions } from "../../Api/api";
import jMoment from "jalali-moment";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import './style.css';
import { useNavigate } from "react-router-dom";


type DataType = {
  id:number;
  title: string;
  against: number;
  favor: number;
  abstaining: number;
  jdate: string;
  votes: number | null;
};

const columns: ColumnsType<DataType> = [
  {
    title: "عنوان",
    dataIndex: "title",
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.title.startsWith(value.toString()),
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
      <span style={{direction:"ltr"}}>
        {`(${(
        (row.favor / (row.against + row.abstaining + row.favor)) *
        100
      ).toFixed(0)}%) ${row.favor}`}</span>
    ),
  },
  {
    title: "ممتنع",
    dataIndex: "abstaining",
    sorter: (a, b) => a.abstaining - b.abstaining,
    render: (text, row) => (
      <span style={{direction:"ltr"}}>{`(${(
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
    render: (text, record) => record.abstaining + record.against + record.favor,
  },
];

interface IProps{
}

export default function MainTableComponent(props:IProps) {
const navigate=useNavigate();

  useEffect(() => {
    const base_from = jMoment("1401/12/21", "jYYYY/jMM/jDD").toISOString();

    get_sessions(base_from, jMoment().toISOString()).then((x) => {
      setData(x.data);
    });
    console.log(base_from);
  }, []);

  const [data, setData] = useState(new Array<DataType>());
  
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        bordered
        className="striped"
        loading={data.length==0}
        rowKey={"id"}
        onRow={(record, rowIndex) => {
            return {
                onClick: event => navigate('/session/'+record.id)
        }
    }}
      />
    </div>
  );
}
