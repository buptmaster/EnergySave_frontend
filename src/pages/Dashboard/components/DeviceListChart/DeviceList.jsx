import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import styles from './index.module.scss';
import Axios from 'axios';
import qs from 'qs';

export default function DeviceList() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (current = 1) => {
    Axios.get('/device/all',{
      params:{
        pageNum: current,
        pageSize: 10
      }
    }).then((res) => {
      let pagesAndTopics = [];
      pagesAndTopics = res.data.data.pages.content;
      console.log(pagesAndTopics)
      pagesAndTopics.map((item, index) => {
        item["topic"] = res.data.data.topics[index];
      })
      setData(pagesAndTopics)
      setLoading(false)
    })
  }

  const handlePaginationChange = (currentPage) => {
    setCurrent(currentPage)
    setLoading(true)
    fetchData(currentPage);
  };

  const toggleView = (record) => {
    return (
      <div>
        <span>所属类别：</span>
        {record.topic.map((item) => {
          return (
            <Button type="primary" style={{margin: "8px"}}>{item === "" ? "独立设备" : item}</Button>
          )
        })}
      </div>
    )
  }

  const removeView = (value, index, record) => {

    const onRemove = () => {
      Axios.post('/device/removeTopics', qs.stringify({deviceId: record.deviceId}))
      .then(() => {
        fetchData(current)
        Message.success("移除成功")
      })
    }


    const onDelete = () => {
      Dialog.confirm({
        title:"警告",
        content:"确认彻底删除此设备吗？",
        onOk: ()=>{
          Axios.post("/device/delete", qs.stringify({deviceId: record.deviceId}))
          .then(() => {
            fetchData(current)
            Message.success("删除成功")
          })
        }
      })
    }

    return (
      <div>
        <Button type="primary" onClick={onRemove} style={{marginRight: "8px"}}>清空设备类别</Button>
        <Button type="normal" warning onClick={onDelete} >彻底删除设备</Button>
      </div>
    )
  }


  return (
    <div className={styles.container}>
      <Table 
        loading={isLoading} 
        dataSource={data} 
        hasBorder={false}
        expandedRowRender={toggleView}
        primaryKey="deviceId">
        <Table.Column title="设备ID" dataIndex="deviceId" />
        <Table.Column title="设备名称" dataIndex="deviceName" />
        <Table.Column title="设备状态" dataIndex="status" />
        <Table.Column title="操作" cell={removeView} />
      </Table>
      <Pagination
        size="small"
        className={styles.pagination}
        current={current}
        onChange={handlePaginationChange}
        pageShowCount={2}
      />
    </div>
  );
}
