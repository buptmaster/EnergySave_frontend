import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Search, Menu, DatePicker, Input, Button, Message } from '@alifd/next';
import Axios from 'axios';
import styles from './index.module.scss';

function UserRequest(props) {

    const { RangePicker } = DatePicker;

    //设备组
    const [value, setValue] = useState("");
    //设备组搜索
    const [search, setSearch] = useState([]);
    //设备组搜索下拉框可见
    const [visible, setVisible] = useState(false);

    const [text, setText] = useState("");
    const [date, setDate] = useState([]);

    const PopUpView = () => {
        return (
            <Menu
                selectMode="single"
                onSelect={(keys) => {
                    setValue(keys[0])
                }}
            >
                {search.map((item) => {
                    return (
                        <Menu.Item
                            key={item}
                        >
                            {item}
                        </Menu.Item>
                    )
                })}
            </Menu>
        )
    }

    return (
        <div style={
            {
                backgroundColor: "#447eff",
                position: "absolute",
                width:"100%",
                height:"100%"
            }} >
        <div style={
            {
                margin:"0 auto",
                width:"550px",
                marginTop:"100px"
            }} >
            <IceContainer>
                <p className={styles.para}><b style={{fontSize: "20px"}} >设备开启申请表</b></p>
                <p className={styles.para}>
                    <span >设备组选择：</span>
                    <Search
                        style={{ width: "300px" }}
                        value={value}
                        popupContent={<PopUpView />}
                        visible={visible}
                        placeholder="选择设备"
                        dataSource={search}
                        onChange={(key) => {
                            setValue(key)
                            Axios.get(`/device/searchCg?key=${key}`)
                                .then((res) => {
                                    setSearch(res.data.data)
                                    setVisible(true)
                                })
                        }}
                        onVisibleChange={() => setVisible(false)}
                        onFocus={() => setVisible(true)}
                    />
                </p >
                <p className={styles.para}>
                    <span>时间选择：</span>
                    <RangePicker
                        showTime
                        onChange={(date) => {
                            setDate(date)
                        }}
                    />
                </p>

                <p className={styles.para}>
                    <span >申请理由：</span>
                    <Input.TextArea
                        onChange={(value) => {
                            setText(value)
                        }}
                    />
                </p>
                <p>
                    <Button 
                        type="primary"
                        onClick={() => {
                            if(!date[0] || !date[1]) {
                                Message.warning("请补全时间")
                                return
                            }
                            let time = `${date[0].format("YYYY-MM-DD HH:MM")}~${date[1].format("YYYY-MM-DD HH:MM")}`;
                            Axios.post('/user/commit',{
                                time: time,
                                reason: text,
                                deviceGroup: value
                            })
                        }} 
                    >
                        确认申请
                    </Button>
                </p>
            </IceContainer>
        </div>
        </div>
    )
}

export default UserRequest;