import React, {useEffect, useState} from 'react';
import PageHead from '@/components/PageHead';
import styles from './index.module.scss';
import { Table, Grid, Button, Dialog, Tag } from '@alifd/next';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

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

  const footerView = (record, i) => {
    return (
      <Button 
        onClick={() => {
          Dialog.confirm({
            title: "警告",
            content: `确认删除策略 ${record.strategyName} 吗？`,
            onOk: () => {
              Axios.post("/strategy/delete", qs.stringify({name: record.strategyName}));
              data.splice(i, 1);
              setData([...data])
            }
          })
        }}
        type="primary" warning>
          删除策略
      </Button>
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
              <Table.GroupFooter cell={footerView} />
              <Table.Column width={120} title="优先级" dataIndex="priority"/>
              <Table.Column width={200} title="设备（组）" dataIndex="deviceGroup" />
              <Table.Column width={300} cell={timeView} title="开启时间段" dataIndex="time" />
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(StrategyOverView);