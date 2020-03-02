import React, { useState } from 'react';
import { Dialog, Button, Input, Card, DatePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router-dom';
import PageHead from '@/components/PageHead';
import styles from './index.module.scss';
import { Grid } from '@alifd/next';
import FormBinderWrapper, { FormBinder, FormError } from '@icedesign/form-binder';
import moment from 'moment';
import Axios from 'axios';

function AddStrategy(props) {

  const { Row, Col } = Grid;
  const { RangePicker } = DatePicker;

  const [data, setData] = useState(
    { strategyName: '', priority: 0, child: [{ deviceGroup: '', time: [{ rangePicker: [] }] }] }
  );

  const addDevice = () => {
    data.child.push({ deviceGroup: '', time: [{ rangePicker: [] }] });
    setData({
      strategyName: data.strategyName,
      priority: data.priority,
      child: data.child
    });
  }

  let f;

  return (
    <div>
      <PageHead
        title="添加策略"
        buttonText="确认添加"
        onClick={() => {
          f.validateFields((errors, values)=>{
            if(!errors){
              let newvals = values.child.map((item, index) => {
                let snewvals = item.time.map((sitem, sindex) => {
                  console.log(sitem.rangePicker[0])
                  return `${sitem.rangePicker[0]}~${sitem.rangePicker[1]}`
                })
                console.log(snewvals)
                return {
                  deviceGroup: item.deviceGroup, 
                  time: snewvals
                };
              })
              console.log(newvals)
              Axios.post("/strategy/add", {
                strategyName: values.strategyName,
                priority: values.priority,
                child:newvals
              })
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
            <Col l="8" >
              <span style={{ marginRight: "8px" }}>策略名称: </span>
              <FormBinder name="strategyName" required message="必填">
                <Input />
              </FormBinder>
              <FormError name="strategyName" />
            </Col>
            <Col l="8" >
              <span style={{ marginRight: "8px" }}>策略优先级: </span>
              <FormBinder name="priority" required message="必填" >
                <Input />
              </FormBinder>
              <FormError name="priority" />
            </Col>
            <Col>
            <Button
              type="primary"
              onClick={addDevice} >添加设备组</Button>
            </Col>
          </Row>
          <Row gutter={10} wrap >
            {data.child.map((item, index) => {
              return (
                <IceContainer>
                <Col l="24">
                  <Card contentHeight="auto" >
                    <div>
                      <Button 
                       type="primary"
                       warning 
                       style={{position : "absolute", right:"8px"}}
                       onClick={() => {
                         data.child.splice(index, 1);
                         setData({
                           strategyName: data.strategyName,
                           priority: data.priority,
                           child: data.child
                         })
                       }} >
                         移除
                       </Button>
                      <span style={{ marginRight: "8px" }} >
                        设备（组）名称：
                      </span>
                      <FormBinder required name={`child[${index}].deviceGroup`} >
                        <Input />
                      </FormBinder>
                      <div>
                        {item.time.map((citem, cindex) => {
                          return (
                            <p>
                              <span style={{ marginRight: "8px" }}>区间日期时间选择：</span>
                              <FormBinder 
                                type="array"
                                message="必填" 
                                getFieldValue={(date) => {
                                  if(typeof(date[0]) == 'string' || typeof(date[1]) == 'string')
                                    return date;
                                  console.log(date)
                                  return [
                                    date[0] ? date[0].format("YYYY-MM-DD HH:MM") : "",
                                    date[1] ? date[1].format("YYYY-MM-DD HH:MM") : ""
                                  ]
                                }}
                                name={`child[${index}].time[${cindex}].rangePicker`} >
                                <RangePicker 
                                 size="small" 
                                 showTime={{format:"HH:MM"}}
                                 format="YYYY-MM-DD"
                                />
                              </FormBinder>
                            </p>
                          )
                        })}
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => {
                            data.child[index].time.push({ rangePicker: [[]] })
                            setData({
                              strategyName: data.strategyName,
                              priority: data.priority,
                              child: data.child
                            });
                          }}>添加时间范围</Button>
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
  );
}

export default withRouter(AddStrategy);
