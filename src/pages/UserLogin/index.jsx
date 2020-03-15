import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import qs from 'qs';
import IceIcon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';
import Axios from 'axios';

let form;
function UserLogin(props) {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });

  const formChange = (formValue) => {
    setValue(formValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('/user/login', qs.stringify(value))
    .then((rep) => {
      Message.success('登录成功');
      props.history.push('/');
    }).catch((rep) => Message.warning('登录失败'));
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>登 录</h4>
      <IceFormBinderWrapper
        value={value}
        onChange={formChange}
        ref={formRef => form = formRef}
      >
        <div className={styles.formItems}>
          <div className={styles.formItem}>
            <IceIcon type="person" size="small" className={styles.inputIcon} />
            <IceFormBinder name="username" required message="必填">
              <Input
                size="large"
                maxLength={20}
                placeholder="用户名"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="username" />
          </div>

          <div className={styles.formItem}>
            <IceIcon type="lock" size="small" className={styles.inputIcon} />
            <IceFormBinder name="password" required message="必填">
              <Input
                size="large"
                htmlType="password"
                placeholder="密码"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="password" />
          </div>

          <div className={styles.footer}>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              登 录
            </Button>
          </div>
        </div>
      </IceFormBinderWrapper>
    </div>
  );
}


export default withRouter(UserLogin);
