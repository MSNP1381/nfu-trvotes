import { useEffect, useState } from "react";
import { get_all_members, get_memberImage, getColor } from "../../Api/api";
import { Row, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { get_date_percent } from "../SessionPage/SessionPage";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph, Text, Link } = Typography;
type DataType = {
  name: string;
  family: string;
  region: string;
  jFirstVote: string;
  memId: string;
  imageUrl: string;
  absence: number;
  nonParticipation: number;
  against: number;
  favor: number;
  abstaining: number;
  isClarified: boolean;
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
    render: (value, record, index) => {
      return record.name + " " + record.family;
    },
  },

  {
    title: "حوزه انتخابیه",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "مخالف",
    dataIndex: "against",
    sorter: (a, b) => a.against - b.against,
    render: (text, row) =>
      row.isClarified ? (
        <span style={{ direction: "ltr" }}>{`(${(
          (row.against /
            (row.against +
              row.abstaining +
              row.favor +
              row.absence +
              row.nonParticipation)) *
          100
        ).toFixed(0)}%) ${row.against}`}</span>
      ) : (
        <Text type="danger" strong>
          عدم شفافیت
        </Text>
      ),
  },
  {
    title: "موافق",
    dataIndex: "favor",
    sorter: (a, b) => a.favor - b.favor,
    render: (text, row) =>
      row.isClarified ? (
        <span style={{ direction: "ltr" }}>
          {`(${(
            (row.favor /
              (row.against +
                row.abstaining +
                row.favor +
                row.absence +
                row.nonParticipation)) *
            100
          ).toFixed(0)}%) ${row.favor}`}
        </span>
      ) : (
        <Text type="danger" strong>
          عدم شفافیت
        </Text>
      ),
  },
  {
    title: "عدم مشارکت",
    dataIndex: "nonParticipation",
    sorter: (a, b) => a.nonParticipation - b.nonParticipation,
    render: (text, row) =>
      row.isClarified ? (
        <span style={{ direction: "ltr" }}>
          {`(${(
            (row.nonParticipation /
              (row.against +
                row.abstaining +
                row.favor +
                row.absence +
                row.nonParticipation)) *
            100
          ).toFixed(0)}%) ${row.nonParticipation}`}
        </span>
      ) : (
        <Text type="danger" strong>
          عدم شفافیت
        </Text>
      ),
  },
  {
    title: "ممتنع",
    dataIndex: "abstaining",
    sorter: (a, b) => a.abstaining - b.abstaining,
    render: (text, row) =>
      row.isClarified ? (
        <span style={{ direction: "ltr" }}>{`(${(
          (row.abstaining /
            (row.against +
              row.abstaining +
              row.favor +
              row.absence +
              row.nonParticipation)) *
          100
        ).toFixed(0)}%) ${row.abstaining}`}</span>
      ) : (
        <Text type="danger" strong>
          عدم شفافیت
        </Text>
      ),
  },
  {
    title: "عدم حضور",
    dataIndex: "absence",
    sorter: (a, b) => a.absence - b.absence,
    render: (text, row) =>
      row.isClarified ? (
        <span style={{ direction: "ltr" }}>
          {" "}
          {`(${(
            (row.absence /
              (row.against +
                row.abstaining +
                row.favor +
                row.absence +
                row.nonParticipation)) *
            100
          ).toFixed(0)}%) ${row.absence}`}
        </span>
      ) : (
        <Text type="danger" strong>
          عدم شفافیت
        </Text>
      ),
  },

  {
    title: "اولین شفاف سازی",
    dataIndex: "jFirstVote",
    key: "jFirstVote",
    render: (value, record, index) => {
      let p = 1 - get_date_percent(value);
      p = p < 0.7 ? 0.0 : p;
      let v = getColor(p);
      return record.isClarified ? (
        <span style={{ color: v }}>{value}</span>
      ) : (
        <Text type="danger" >
          عدم شفافیت
        </Text>
      );
    },

    sorter: (a, b) => {
      let x1 = a.isClarified ? a.jFirstVote.replace("/", "") : "-1";
      let x2 = a.isClarified ? b.jFirstVote.replace("/", "") : "-1";
      return parseInt(x1) - parseInt(x2);
    },
  },
];
export default function AllMembersComponent() {
  const navigate = useNavigate();

  const [data, setData] = useState([] as DataType[]);
  useEffect(() => {
    get_all_members().then((x) => {
      setData(x.data);
      console.log(x.data);
    });
  }, []);

  return (
    <>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        bordered
        className="striped"
        loading={data.length == 0}
        rowKey={"id"}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => navigate("/member/" + record.memId),
          };
        }}
      />
    </>
  );
}
