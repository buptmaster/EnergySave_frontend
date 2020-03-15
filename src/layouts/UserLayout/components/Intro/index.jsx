import React from 'react';
import styles from './index.module.scss';

const LoginIntro = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>智能教室节能系统</div>
        <p className={styles.description}>多数据可视化展示的智能教室节能系统</p>
        <p className={styles.description}>一起解构数字世界，碰撞科技创新思想</p>
      </div>
    </div>
  );
};

export default LoginIntro;
