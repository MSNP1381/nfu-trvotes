import { HeadDataType } from "../SessionPage";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";

import { blue, green, gray, red, yellow } from "@ant-design/colors";

const { Text, Link } = Typography;
function HeadCard({ title, value, color = "black" }: any) {
  return (
    <Card title={title}>
      <Text type={color}>{value}</Text>
    </Card>
  );
}

export default function SessionHeaderComponent(props: HeadDataType) {
  return (
    <div>
      <Row  justify={"center"} gutter={[16, 24]}>
        <Col span={24}>
          <Statistic
          style={{textAlign:"center"}}
            valueStyle={{
              fontSize: "20px",
              textAlign: "center",
              justifyContent: "center",
            }}
            title={"عنوان"}
            value={props.title==''?"":props.title}
            
          />
        </Col>
      </Row>

      <Row justify={"center"} gutter={8}  >
        <Col span={6}>
          <Statistic
          style={{textAlign:"center"}}
        
            valueStyle={{ color: gray.primary,}}
            title={"تاریخ"}
            value={props.jdate}
          />
        </Col>
        <Col span={6}>
          <Statistic
          style={{textAlign:"center"}}

            valueStyle={{ color: green.primary }}
            title={"رای موافق"}
            value={props.favor}
          />
        </Col>
        <Col span={6}>
          <Statistic
          style={{textAlign:"center"}}

            valueStyle={{ color: red.primary }}
            title={"رای مخالف"}
            value={props.against}
          />
        </Col>
        <Col span={6}>
          <Statistic
          style={{textAlign:"center"}}

            valueStyle={{ color: blue.primary }}
            title={"رای ممتنع"}
            value={props.abstaining}
          />
        </Col>
      </Row>
    </div>
  );
}
