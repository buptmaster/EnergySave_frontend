import React, { useState, useEffect } from 'react';
import PageHead from '@/components/PageHead';
import { Table, Button, Select } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import qs from 'qs';

function DeviceRequest(props) {

    const [data, setData] = useState([]);

    const fetchData = (v = 'unauthorized') => {
        Axios.get(`/request?status=${v}`)
        .then((res) => {
            setData(res.data.data)
        })
    }

    const changeStatus = (id, status) => {
        Axios.post('/request/change', qs.stringify({
            id: id,
            status: status
        }))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const optionView = (v, i, record) => {
        let disable = record.status !== 'unauthorized'
        return (
            <div>
                <Button 
                    onClick={() => {
                        changeStatus(record.id, "granted")
                        fetchData()
                    }}
                    disabled={disable} 
                    type="primary" 
                    style={{marginRight: "8px"}}>
                        同意
                    </Button>
                <Button 
                    onClick={() => {
                        changeStatus(record.id, "denied")
                        fetchData()
                    }}
                    disabled={disable} 
                    type="primary" 
                    warning >
                        否决
                    </Button>
            </div>
        )
    }
    

    return (
        <div>
            <PageHead
                title="申请审批"
            />
            <Select 
                style={{marginBottom : "8px"}}
                defaultValue="unauthorized"
                onChange={(v) => {
                    fetchData(v)
                }} 
            >
                <Select.Option value="unauthorized" >待审批</Select.Option>
                <Select.Option value="granted" >已通过</Select.Option>
                <Select.Option value="denied" >已否决</Select.Option>
            </Select>
            <div >
                <Table
                    hasBorder={true}
                    dataSource={data}
                >
                    <Table.Column title="用户名" dataIndex="username" />
                    <Table.Column title="申请设备组" dataIndex="deviceGroup" />
                    <Table.Column title="申请时间" dataIndex="time" />
                    <Table.Column title="申请理由" dataIndex="reason" />
                    <Table.Column title="申请状态" dataIndex="status" />
                    <Table.Column title="提交时间" dataIndex="createTime" />
                    <Table.Column title="操作" cell={optionView} />
                </Table>

            </div>
        </div>
    )
}

export default withRouter(DeviceRequest)