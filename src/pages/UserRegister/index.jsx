import React, { useState, useEffect, version } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Select, Table, Grid, Message } from '@alifd/next';
import PageHead from '@/components/PageHead'
import Axios from 'axios';

function UserRegister() {

  const {Row, Col} = Grid

  const [data, setData] = useState([])
  const [user, setUser] = useState({username:'', password:'', role:'NORMAL'})

  const fetchData = () => {
    Axios.get('/user/all')
      .then((res) => setData(res.data.data))
      .catch((res) => Message.warning('未授权'))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <PageHead
        title="用户管理"
        buttonText="添加用户"
        onClick={() => {
          if(user.username && user.password){
            Axios.post('/user/addUser', user).catch(() => {Message.warning('未授权')})
          }
        }}
      />
      <div style={{marginBottom:"16px"}}>
        <Row>
          <Col >
            <span style={{marginLeft:"8px"}}>用户名：</span>
            <Input onChange={(t) => {
              user.username = t
              setUser({...user})
            }} />
          </Col>
          <Col >
            <span style={{marginLeft:"8px"}}>用户密码：</span>
            <Input onChange={(v) => {
              user.password = v
              setUser({...user})
            }} />
          </Col>
          <Col >
            <span style={{marginLeft:"8px"}}>用户角色：</span>
            <Select
              defaultValue="NORMAL"
              onChange={(v) => {
                user.role = v
                setUser({...user})
              }}
            >
              <Select.Option value="ADMIN" >Admin</Select.Option>
              <Select.Option value="NORMAL" >Normal</Select.Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div>
        <Table
          hasBorder={true}
          dataSource={data}
        >
          <Table.Column title="用户名" dataIndex="userName" />
          <Table.Column title="ID" dataIndex="authId" />
          <Table.Column title="角色" dataIndex="role" />
          <Table.Column title="操作" cell={
            <Button
              warning
              type="primary"
              onClick={(v, i, record) => {
                Axios.post(`/user/delUser?username=${record.userName}`)
              }}
            >
              删除
            </Button>
          } /> 
        </Table>
      </div>
    </div>
  );
}


export default withRouter(UserRegister);
