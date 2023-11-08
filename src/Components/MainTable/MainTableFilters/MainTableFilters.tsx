import {Button, Col, ConfigProvider, Row, message} from "antd";
import Search, {SearchProps} from "antd/lib/input/Search";
import moment from "jalali-moment";
import "./style.css";
import {useRef, useState} from "react";
import dayjs from 'dayjs'
import jalaliday from 'jalaliday';
import 'jalaliday/';
import locale from "antd/es/date-picker/locale/fa_IR"; 
import calendar from 'dayjs/plugin/calendar';

import type {TimeRangePickerProps} from 'antd';
import {DatePicker, Space} from 'antd';
import {RangePickerProps} from "antd/es/date-picker";
import { Link } from "react-router-dom";
dayjs.locale("fa");
const {RangePicker} = DatePicker;
export type FilterType = {
    title: string;
    startDate: string;
    endDate: string;
};

interface IProps {
    setData: React.Dispatch<React.SetStateAction<FilterType>>;
}

dayjs.extend(calendar);
dayjs.extend(jalaliday);
moment.locale("fa");
dayjs.locale("fa");

dayjs().calendar('jalali');
export default function MainTableFiltersComponent({setData}: IProps) {
    let base_date = "1401/12/21";
    const bdate = dayjs("1401-12-21");
    const now_ = moment().format("YYYY-MM-DD");
    var n = now_;
    const ndate = dayjs(n);
    console.log(n);


    const [messageApi, contextHolder] = message.useMessage();
    const calendarRef = useRef<HTMLDivElement>();
    const onSearch: SearchProps["onSearch"] = (value: string, _e: any) =>
        setData((data: any) => {
            console.log(value, _e);
            return {...data, title: value};
        });
    const disabledDate: RangePickerProps["disabledDate"] = (current) => {
        const v = current.format("YYYY/MM/DD");
        return !(v >= base_date && v <= n);
    };
    return (
        <>
            {contextHolder}
            <Row gutter={24} style={{padding: "10px 1% "}}>
                <Col>
                    <Search
                        style={{borderRadius: "12px"}}
                        placeholder="جستجو عنوان"
                        onSearch={onSearch}
                        // style={{ width: 200 }}
                        enterButton
                    />
                </Col>
                <Col>

                    <RangePicker

                        locale={locale}
                        disabledDate={disabledDate}
                        onChange={(v: any) => {
                            console.log(v);
                            if (v == null) {
                                setData((x) => {
                                    return {title: x.title, startDate: base_date, endDate: n};
                                });
                            }
                            const m1 = v[0]["$jM"] + 1;
                            const m2 = v[1]["$jM"] + 1;
                            let startDate = `${v[0]["$jy"]}/${
                                m1 < 10 ? "0" + m1 : m1
                            }/${v[0]["$jD"] < 10 ? "0" + v[0]["$jD"] : v[0]["$jD"]}`;
                            let endDate = `${v[1]["$jy"]}/${
                                m2 < 10 ? "0" + m2 : m2
                            }/${v[1]["$jD"] < 10 ? "0" + v[1]["$jD"] : v[1]["$jD"]}`;
                            console.warn(
                                v,
                                startDate,
                                endDate,
                                startDate >= base_date,
                                endDate <= n
                            );
                            if (!(startDate >= base_date && endDate <= n))
                                messageApi.error(
                                    "بازه زمانی 1401/12/21 تا امروز معتبر است",
                                    1500
                                );
                            setData((x) => {
                                console.error({title: x.title, startDate, endDate});
                                return {title: x.title, startDate, endDate};
                            });
                        }}
                    />
                </Col>
                <Col>
                <Link to={"/members"} ><Button>صفحه اعضا</Button></Link> 
                </Col>
            </Row>
        </>
    );
}
