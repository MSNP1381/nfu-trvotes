import React, { useEffect, useState } from "react";
import { Table, TablePaginationConfig, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { getColor, get_memberImage, get_session } from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import moment from "jalali-moment";
import { blue, green, gray, red, yellow } from "@ant-design/colors";
import "../MainTable/style.css";
import { type } from "os";
import SessionHeaderComponent from "./SessionHeader/SessionHeader";
type DataType = {
  name: string;
  family: string;
  region: string;
  activity: number;
  activityName: string;
  jFirstVote: string;
  memId: string;
  imageUrl: string;
};

export type HeadDataType = {
  id: number;
  title: string;
  against: number;
  favor: number;
  abstaining: number;
  jdate: string;
  date: string;
};
export default function SessionPageComponent() {
  const get_date_percent = (x: string) => {
    const base_from = moment("1401/12/21", "jYYYY/jMM/jDD").valueOf();
    const base_to = moment(x, "jYYYY/jMM/jDD").valueOf();
    const now = moment().valueOf();
    if (x == "1402/02/10")
      console.log((base_to - base_from) / (now - base_from));

    return (base_to - base_from) / (now - base_from);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (value, record, index) => (
        <img
          src={get_memberImage(record.memId)}
          width={"60px"}
          alt={record.name + " " + record.family}
        />
      ),
      align: "center",
      width: "auto",
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "family",
      key: "family",
    },
    {
      title: "حوزه انتخابیه",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "رای",
      dataIndex: "activityName",
      key: "activityName",
      render: (value, record, index) => {
        let color_ = undefined;
        if (value == "ممتنع") color_ = "blue";
        if (value == "موافق") color_ = "green";
        if (value == "عدم حضور") color_ = "gray";
        if (value == "مخالف") color_ = "red";
        if (value == "عدم مشارکت") color_ = "yellow";
        return (
          <Tag color={color_} key={value}>
            {value}
          </Tag>
        );
      },
      filterMode: "tree",
      filterSearch: true,
      filters: [
        {
          text: "ممتنع",
          value: "ممتنع",
        },
        {
          text: "موافق",
          value: "موافق",
        },
        {
          text: "مخالف",
          value: "مخالف",
        },
        {
          text: "عدم حضور",
          value: "عدم حضور",
        },
        {
          text: "عدم مشارکت",
          value: "عدم",
        },
      ],

      onFilter: (value, record) => record.activityName.includes(value.toString()),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.activity - b.activity,
    },
    {
      title: "اولین شفاف سازی",
      dataIndex: "jFirstVote",
      key: "jFirstVote",
      render: (value, record, index) => {
        let p = 1 - get_date_percent(value);
        p = p < 0.7 ? 0.0 : p;

        let v = getColor(p);
        return <span style={{ color: v }}>{value}</span>;
      },
      sorter: (a, b) =>
        parseInt(a.jFirstVote.replace("/", "")) -
        parseInt(b.jFirstVote.replace("/", "")),
    },
  ];
  const navigate=useNavigate();

  const { id } = useParams();
  const [data, setData] = useState(new Array<DataType>());
  const [sessionData, setSessionData] = useState({} as HeadDataType);

  useEffect(() => {
    get_session(id ?? "").then((x) => {
      setSessionData(x.data);

      let d: DataType[] = x.data.votes.map((u: any) => {
        return {
          memId: u.member.memId,
          name: u.member.name,
          family: u.member.family,
          region: u.member.region,
          imageUrl: u.member.imageUrl,
          jFirstVote: u.member.jFirstVote,
          activityName: u.activityName,
          activity: u.activity,
          jdate: u.jdate,
        };
      });
      setData(d);
    });


    
  }, []);
  return (
    <div>
      <div>
        <SessionHeaderComponent {...sessionData} />
      </div>
      <div>
        <Table
          rowKey={"memId"}
          dataSource={data}
          columns={columns}
          bordered
          loading={data.length == 0}
          pagination={{
            pageSizeOptions: [25, 50, 100, 200],
          }}
          className="striped px-4"
          onRow={(record, rowIndex) => {
            return {
                onClick: event => navigate('/member/'+record.memId)
        }
    }}
        ></Table>
      </div>
    </div>
  );
}
