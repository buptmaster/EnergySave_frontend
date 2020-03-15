import React, { useState } from 'react';
import PageHead from '@/components/PageHead';
import { Grid, Input, DatePicker, TimePicker, Card, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import FormBinderWrapper, { FormBinder } from '@icedesign/form-binder';
import Axios from 'axios';

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
                onClick={() => {
                    f.validateFields((errors, values) => {
                        if(!errors){
                            let copy = values;
                            let newChild = copy.child.map((item) => {
                                let newTime = item.time.map((t) => {
                                    if(!t) return '';
                                    return `${t[0].format("HH:MM")}~${t[1].format("HH:MM")}`
                                })
                                return {
                                    deviceGroup: item.deviceGroup,
                                    weekStart: `${item.weekStart.format("YYYY")}-${item.weekStart.week()}`,
                                    weekEnd: `${item.weekEnd.format("YYYY")}-${item.weekEnd.week()}`,
                                    time: newTime
                                }
                            })
                            Axios.post('/strategy/addPerWeek', {
                                strategyName: values.strategyName,
                                priority: values.priority,
                                child: newChild
                            }).then((res) => Message.success("添加成功"))
                            .catch((res) => Message.success("添加失败"))
                        }
                    })
                }}
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
                                                        <span style={{ marginRight: "16px" }} >
                                                            起始周：
                                                    </span>
                                                        <FormBinder required name={`child[${index}].weekStart`}>
                                                            <WeekPicker size="small" />
                                                        </FormBinder>
                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }} >
                                                            结束周：
                                                        </span>
                                                        <FormBinder required name={`child[${index}].weekEnd`}>
                                                            <WeekPicker size="small" />
                                                        </FormBinder>
                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }}>星期一:</span>
                                                        <FormBinder
                                                            name={`child[${index}].time[0]`}
                                                        >
                                                            <RangePicker
                                                                showTime
                                                                type="year"
                                                                format="NNN"
                                                                size="small"
                                                            />
                                                        </FormBinder>

                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }}>星期二:</span>
                                                        <FormBinder

                                                            name={`child[${index}].time[1]`}
                                                        >
                                                            <RangePicker
                                                                showTime
                                                                type="year"
                                                                format="NNN"
                                                                size="small"
                                                            />
                                                        </FormBinder>

                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }}>星期三:</span>
                                                        <FormBinder
                                                            
                                                            name={`child[${index}].time[2]`}
                                                        >
                                                            <RangePicker
                                                                showTime
                                                                type="year"
                                                                format="NNN"
                                                                size="small"
                                                            />
                                                        </FormBinder>

                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }}>星期四:</span>
                                                        <FormBinder
                                                            
                                                            name={`child[${index}].time[3]`}
                                                        >
                                                            <RangePicker
                                                                showTime
                                                                type="year"
                                                                format="NNN"
                                                                size="small"
                                                            />
                                                        </FormBinder>

                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }}>星期五:</span>
                                                        <FormBinder
                                                        
                                                            name={`child[${index}].time[4]`}
                                                        >
                                                            <RangePicker
                                                                showTime
                                                                type="year"
                                                                format="NNN"
                                                                size="small"
                                                            />
                                                        </FormBinder>

                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }}>星期六:</span>
                                                        <FormBinder
                                                            
                                                            name={`child[${index}].time[5]`}
                                                        >
                                                            <RangePicker
                                                                showTime
                                                                type="year"
                                                                format="NNN"
                                                                size="small"
                                                            />
                                                        </FormBinder>

                                                    </p>
                                                    <p>
                                                        <span style={{ marginRight: "16px" }}>星期天:</span>
                                                        <FormBinder
                                                            
                                                            name={`child[${index}].time[6]`}
                                                        >
                                                            <RangePicker
                                                                showTime
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