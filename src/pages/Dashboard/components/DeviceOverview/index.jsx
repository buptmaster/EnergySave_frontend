import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Axios from 'axios';

const { Row, Col } = Grid;
export default function DeviceOverview() {

  let intervalRef = useRef()

  const [value, setValue] = useState({
    offline: 0,
    allow: 0,
    forbidden: 0
  }) 
  
  const [mqtt, setMqtt] = useState({
    in: '0',
    out: '0',
    connected: '0',
    disconnected: '0',
    total: '0'
  })

  useEffect(
    () => {
      fetchData()
      intervalRef.current = setInterval(() => {
        fetchStatus()
      }, 2000)

      return () => {
        clearInterval(intervalRef.current)
      }
    }, []
  )

  const fetchData = useCallback(
    async () => {
      Axios.get('/device/counts')
      .then((res) => setValue(res.data.data))
    }
  )

  const fetchStatus = () => { Axios.get('/device/mqtt').then((res) => setMqtt(res.data.data))}


  return (
    <Row wrap gutter={20} style={{ marginBottom: '20px' }}>
          <Col xxs="12" l="4">
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title} >离线设备数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount} style={{color: 'red'}}>{value.offline}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="12" l="4" >
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title}>开启设备数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount} style={{color: 'green'}}>{value.allow}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="12" l="4" >
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title}>禁用设备数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount}>{value.forbidden}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="12" l="4" >
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title}>MQTT发送字节数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount}>{mqtt.out ? mqtt.out : '0'}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="12" l="4" >
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title}>MQTT收到字节数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount}>{mqtt.in ? mqtt.in : '0'}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="12" l="4" >
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title}>MQTT已连接总数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount}>{mqtt.connected ? mqtt.connected : '0'}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="12" l="4" >
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title}>MQTT已断开总数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount}>{mqtt.disconnected ? mqtt.disconnected :'0'}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="12" l="4" >
            <IceContainer className={styles.container}>
              <div className={styles.content}>
                <p className={styles.title}>MQTT总连接数</p>
                <div className={styles.data}>
                  <h2 className={styles.amount}>{mqtt.total ? mqtt.total : '0'}</h2>
                </div>
              </div>
            </IceContainer>
          </Col>
    </Row>
  );
}
