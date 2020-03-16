import React, { useState, useEffect } from 'react';
import PageHead from '@/components/PageHead';
import { Table, Button, Grid } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import Axios from 'axios';

function DeviceRequest(props) {

    const [data, setData] = useState([]);

    const fetchData = () => {
        Axios.get('/request')
        .then((res) => {
            setData(res.data.data)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const optionView = (v, i, record) => {
        let disable = record.status !== 'unauthorized'
        console.log(disable, record)
        return (
            <div>
                <Button disabled={disable} type="primary" style={{marginRight: "8px"}}>同意</Button>
                <Button disabled={disable} type="primary" warning >否决</Button>
            </div>
        )
    }
    

    return (
        <div>
            <PageHead
                title="申请审批"
            />
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