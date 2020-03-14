import React, { useState } from 'react';
import PageHead from '@/components/PageHead';
import { Grid, Input, DatePicker, TimePicker, Card, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import FormBinderWrapper, { FormBinder } from '@icedesign/form-binder';

function PerWeek(props) {

    const { Row, Col } = Grid;
    const { WeekPicker, RangePicker } = DatePicker;

    const [data, setData] = useState(
        {
            strategyName: '',
            priority: '',
            child: [{
                deviceGroup: '',
                weekStart: '',
                weekEnd: '',
                time: ['', '', '', '', '', '', '']
            }]
        }
    );
    let f;
    return (
        <div>
            <PageHead
                title="按周添加策略"
                buttonText="确认添加"
            />
            <IceContainer>
                <FormBinderWrapper
                    value={data}
                    ref={(form) => f = form}
                >
                    <Row>
                        <Col>
                            <span style={{ marginRight: "4px" }}>策略名称: </span>
                            <FormBinder name="strategyName" required>
                                <Input />
                            </FormBinder>
                        </Col>
                        <Col>
                            <span style={{ marginRight: "4px" }}>策略优先级: </span>
                            <FormBinder name="priority" required>
                                <Input />
                            </FormBinder>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                onClick={() => {
                                    data.child.push({
                                        deviceGroup: '',
                                        weekStart: '',
                                        weekEnd: '',
                                        time: ['', '', '', '', '', '', '']
                                    })
                                    setData({ ...data })
                                }}
                            >
                                添加设备组
                        </Button>
                        </Col>
                    </Row>

                    <Row gutter={10} wrap>
                        {data.child.map((item, index) => {
                            return (
                                <IceContainer>
                                    <Col>
                                        <Card
                                            contentHeight="auto"
                                        >
                                            <div>
                                                <span style={{ marginRight: "8px" }} >
                                                    设备（组）名称：
                                            </span>
                                                <FormBinder required name={`child[${index}].deviceGroup`} >
                                                    <Input />
                                                </FormBinder>
                                                <Button
                                                    style={{ marginLeft: "16px" }}
                                                    type="primary"
                                                    warning
                                                    onClick={() => {
                                                        data.child.splice(index, 1);
                                                        setData({ ...data })
                                                    }}
                                                >
                                                    移除
                                            </Button>
                                                <div>
                                                    <p>
                                                        <span style={{ marginRight: "22px" }} >
                                                            起始周：
                                                    </span>
                                                        <FormBinder name={`child[${index}].weekStart`}>
                                                            <WeekPicker size="small" />
                                                        </FormBinder>
                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "22px" }} >
                                                            结束周：
                                                    </span>
                                                        <FormBinder name={`child[${index}].weekEnd`}>
                                                            <WeekPicker size="small" />
                                                        </FormBinder>
                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "22px" }}>星期一:</span>
                                                        <FormBinder
                                                            type="array"
                                                            name={`child[${index}].time[0]`}
                                                            getFieldValue={(date) => {
                                                                console.log(date)
                                                                if (typeof (date[0]) == 'string' || typeof (date[1]) == 'string')
                                                                    return date;
                              
                                                                return [
                                                                    date[0] ? date[0].format("HH:MM") : "",
                                                                    date[1] ? date[1].format("HH:MM") : ""
                                                                ]
                                                            }}
                                                        >
                                                            <RangePicker
                                                                showTime={{ format: "HH:MM" }}
                                                                type="year"
                                                                format="NNN"
                                                                size="small"
                                                            />
                                                        </FormBinder>

                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                </IceContainer>
                            )
                        })}
                    </Row>
                </FormBinderWrapper>
            </IceContainer>

        </div>

    )
}

export default PerWeek