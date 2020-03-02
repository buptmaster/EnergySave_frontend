import React, {useEffect, useState} from 'react';
import PageHead from '@/components/PageHead';
import styles from './index.module.scss';
import { Table, Grid, Button, Dialog, Tag } from '@alifd/next';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function StrategyOverView(props) {

  const [data, setData] = useState([])

  const {Row, Col} = Grid;

  const groupHeader = (record) => {
    return (
      <div><b>{record.strategyName}</b></div>
    )
  }

  const mockData = [
    { strategyName: "sdfasjdfjasdfj", children: [{priority: 1, deviceGroup: "shfaskhfaskd", time: ["123"] }] },
    { strategyName: "sadfasgrwagfaefawef", children: [{priority: 2, deviceGroup: "casewr", time: ["123","efasdf"] }] }
  ]

  const fetchData = (order = "asc") => {
    Axios.get("/strategy/all", {
      params:{
        order: order
      }
    }).then((res) => {
      console.log(res.data.data)
      setData(res.data.data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const childOptionView = (v, i, record) => {

    const onDelete = () => {
      return (
        Dialog.confirm({
          title : "警告",
          content:"确认删除吗？",
          onOk: () => {console.log("ok")}
        })
      )
    }

    return (
      <div>
        <Button type="normal" warning onClick={onDelete}  >删除该项</Button>
      </div>
    )
  }

  const timeView = (record) => {
    return (
      <div>
        {record.map((item) =>{
          return (
            <p>
              <Tag>{item}</Tag>
            </p>
          )
        })}
      </div>
    )
  }


  return (
    <div>
      <PageHead title="策略管理" 
        buttonText="添加策略" 
        onClick={() => 
        props.history.push("/add/strategy")} />
      <Row wrap >
        <Col l="16">
          <div className={styles.container}>
            <Table
              hasBorder={true}
              dataSource={data}
              primaryKey="strategyName"
            >
              <Table.GroupHeader cell={groupHeader} />
              <Table.Column width={120} title="优先级" dataIndex="priority"/>
              <Table.Column width={200} title="设备（组）" dataIndex="deviceGroup" />
              <Table.Column width={300} cell={timeView} title="开启时间段" dataIndex="time" />
              <Table.Column width={200} title="操作" cell={childOptionView} />
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(StrategyOverView);