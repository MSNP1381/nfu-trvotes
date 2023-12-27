import { HeadDataType } from "../MemberPage";
import {
  get_memberImage,
  green as green_,
  red as red_,
} from "../../../Api/api";
import { Image, Row, Typography, Col, Statistic } from "antd";
import Title from "antd/lib/typography/Title";
import { blue, green, gray, red, yellow } from "@ant-design/colors";
import { Area, Pie } from "@ant-design/plots";

const { Text, Link } = Typography;
export default function MemberPageHeadComponent({
  name,
  family,
  region,
  jFirstVote,
  memId,
  imageUrl,
  votesCount,
  activities,
}: HeadDataType) {
  const all_votes_cnt =
    activities?.abstaining +
    activities?.against +
    activities?.favor +
    activities?.non_participant +
    activities.absence;
  const data = [
    {
      type: "آرای موافق",
      value: activities?.favor,
      color: green.primary,
      position: "right",
    },
    {
      type: "آرای ممتنع",
      value: activities?.abstaining,
      color: yellow.primary,
    },
    {
      type: "آرای مخالف",
      value: activities?.against,
      color: red.primary,
    },
    {
      type: "عدم مشارکت",
      value: activities?.non_participant,
      color: blue.primary,
    },
    {
      type: "عدم حضور",
      value: activities?.absence,
      color: gray.primary,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    theme:{
    colors10:[
      green.primary,yellow.primary,red.primary, blue.primary,gray.primary,
    ]},
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  const plotConfig = {
    data: votesCount ?? [],
    xField: "date",
    yField: "count",

    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: `l(180) 0:${red_}  1:${green_}`,
      };
    },
  };
  return (
    <Row>
      <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
        {memId && <Image src={memId?get_memberImage(memId):"https://placehold.co/200"} placeholder />}
      </Col>
      <Col span={14}>
        <Row className="flex flex-col">
          <Title level={3}>{"نام :" + name + " " + family}</Title>
          <Title level={4}>{"حوزه انتخابیه: " + region}</Title>
        </Row>
        <Row gutter={[16, 16]}>
          <Col flex="auto">
            <Statistic
              valueStyle={{ color: gray.primary }}
              title={"اولین شفاف سازی"}
              value={jFirstVote}
            />
          </Col>
          <Col flex="auto">
            <Statistic
              valueStyle={{ color: green.primary }}
              title={"تعداد کل آرا"}
              value={all_votes_cnt}
            />
          </Col>
        </Row>
      </Col>
      <Col span={7}>
        <Area
          style={{ maxHeight: 200 }}
          autoFit={true}
          animation
          annotations={[
            {
              type: "line",
              start: [jFirstVote, "min"],
              end: [jFirstVote, "max"],
              style: {
                stroke: "red",
                lineDash: [2, 2],
              },
            },
            {
              type: "text",
              position: [jFirstVote, "max"],
              content: "زمان الحاق به شفافیت",
              offsetY: 50,
              offsetX: 2,
              style: {
                textAlign: "left",
              },
            },
          ]}
          {...plotConfig}
          loading={!(votesCount && votesCount.length > 0)}
        />
      </Col>
      <Col flex={"auto"}>
        <Pie {...config} />
      </Col>
    </Row>
  );
}
