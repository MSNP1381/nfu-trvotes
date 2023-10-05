import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  get_firstVotes,
  get_member,
  get_session,
  red,
  green,
} from "../../Api/api";
import { ColumnsType } from "antd/es/table";
import { Table, Tag } from "antd";
import "../MainTable/style.css";
import MemberPageHeadComponent from "./MemberPageHead/MemberPageHead";

export type HeadDataType = {
  name: string;
  family: string;
  region: string;
  jFirstVote: string;
  memId: string;
  imageUrl: string;
  votesCount: Array<FirstVoteType>;
  activities: Activity;
};
export type Activity = {
  against: number | 0;
  favor: number | 0;
  abstaining: number | 0;
  non_participant: number | 0;
};
type DataType = {
  id: number;
  title: string;
  activity: number;
  activityName: string;
  against: number;
  favor: number;
  abstaining: number;
  jdate: string;
};
type FirstVoteType = {
  date: string;
  count: number;
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
    render: (text, record) => record.abstaining + record.against + record.favor,
  },
];

export default function MemberPageComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([] as DataType[]);
  const [memberData, setMemberData] = useState({} as HeadDataType);
  const [voteData, setVoteData] = useState(Array<FirstVoteType>());
  useEffect(() => {
    get_member(id ?? "").then((x) => {
      let d: DataType[] = x.data.votes.map((u: any) => {
        return {
          id: u.votingSession.id,
          abstaining: u.votingSession.abstaining,
          against: u.votingSession.against,
          favor: u.votingSession.favor,
          title: u.votingSession.title,
          jdate: u.votingSession.jdate,
          activity: u.activity,
          activityName: u.activityName,
        } as DataType;
      });
      let favor = 0;
      let non_participant = 0;
      let against = 0;
      let abstaining = 0;

      d.forEach((e) => {
        if (e.activityName == "ممتنع") abstaining += 1;
        else if (e.activityName == "مخالف") against += 1;
        else if (e.activityName == "موافق") favor += 1;
        else non_participant += 1;
      });

      setMemberData({
        family: x.data.family,
        name: x.data.name,
        memId: x.data.memId,
        region: x.data.region,
        imageUrl: x.data.imageUrl,
        jFirstVote: x.data.jFirstVote,
        activities: {
          favor,
          abstaining,
          against,
          non_participant,
        },
        votesCount: memberData.votesCount ?? [],
      });

      setData(d);
    });

    get_firstVotes().then((x) => {
      setVoteData(x.data);

      memberData.votesCount = x.data;
    });
  }, []);

  return (
    <div>
      <div>
        {memberData.votesCount ? (
          <MemberPageHeadComponent {...memberData}></MemberPageHeadComponent>
        ) : (
          ""
        )}
      </div>
      <Table
        rowKey={"memId"}
        dataSource={data}
        columns={columns}
        bordered
        loading={data.length == 0}
        pagination={{
          pageSizeOptions: [25, 50, 100, 200],
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => navigate("/session/" + record.id),
          };
        }}
        className="striped px-4"
      ></Table>
    </div>
  );
}
