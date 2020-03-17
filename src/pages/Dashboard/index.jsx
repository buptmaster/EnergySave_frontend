import React from 'react';
import { Grid } from '@alifd/next';
import PageHead from '@/components/PageHead';
import DeviceOverview from './components/DeviceOverview';
import DeviceList from './components/DeviceListChart/DeviceList'

const { Row, Col } = Grid;

export default function Dashboard() {
  return (
    <div>
      <PageHead title="设备概览" />
      <DeviceOverview />
      <Row gutter="20" wrap>
        <Col l="20">
          <DeviceList />
        </Col>
      </Row>
    </div>
  );
}
