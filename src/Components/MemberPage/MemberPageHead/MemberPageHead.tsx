import { HeadDataType } from "../MemberPage";
import {
  get_memberImage,
  green as green_,
  red as red_,
} from "../../../Api/api";
import { Image, Row, Typography, Col, Statistic } from "antd";
import Title from "antd/lib/typography/Title";
import { blue, green, gray, red, yellow } from "@ant-design/colors";
import { Area } from "@ant-design/plots";

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
    activities?.non_participant;
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
      <Col span={3} style={{display:"flex",justifyContent:"center"}}>
        {memId && <Image src={get_memberImage(memId)} placeholder />}
      </Col>
      <Col span={14}>
        <Row className="flex flex-col">
          <Title level={3}>{"نام :" + name + " " + family}</Title>
          <Title level={4}>{"حوزه انتخابیه: " + region}</Title>
        </Row>
        <Row>
          <Col flex="auto">
            <Statistic
            prefix={all_votes_cnt+" /"}
              valueStyle={{ color: gray.primary }}
              title={"اولین شفاف سازی"}
              value={jFirstVote}
            />
          </Col>
          <Col flex="auto">
            <Statistic
            prefix={all_votes_cnt+" /"}

              valueStyle={{ color: green.primary }}
              title={"تعداد آرای موافق"}
              value={activities?.favor}
            />
          </Col>
          <Col flex="auto">
            <Statistic
            prefix={all_votes_cnt+" /"}

              valueStyle={{ color: blue.primary }}
              title={"تعداد آرای ممتنع"}
              value={activities?.abstaining}
            />
          </Col>
          <Col flex="auto">
            <Statistic
            prefix={all_votes_cnt+" /"}

              valueStyle={{ color: red.primary }}
              title={"تعداد آرای مخالف"}
              value={activities?.against}
            />
          </Col>
          <Col flex="auto">
            <Statistic
            prefix={all_votes_cnt+" /"}

              valueStyle={{ color: yellow.primary }}
              title={"تعداد عدم مشارکت"}
              value={activities?.non_participant}
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
    </Row>
  );
}
