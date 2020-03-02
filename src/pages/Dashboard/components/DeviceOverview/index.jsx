import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Axios from 'axios';

const { Row, Col } = Grid;
export default function DeviceOverview() {

  const [value, setValue] = useState({
    offline: 0,
    allow: 0,
    forbidden: 0
  }) 

  useEffect(
    () => {fetchData()}, []
  )

  const fetchData = useCallback(
    async () => {
      Axios.get('/device/counts')
      .then((res) => setValue(res.data.data))
    }
  )

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
    </Row>
  );
}
