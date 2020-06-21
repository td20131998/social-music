import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  Input,
  DatePicker,
  Select,
  message,
  Tabs,
  Form,
  Divider
} from "antd";
import { connect } from "react-redux";
import { resetToken } from 'common/jwt'
import moment from "moment";
import styled from "styled-components";
import { apiChangeUserInfo, apiChangePassword } from "services/user/api";
import { initUserInfo, setAuthenticate } from "services/user/actions";

const { Item } = List;
const { TabPane } = Tabs;
const { Option } = Select;
const mapValueToGender = {
  1: "Nam",
  2: "Nữ",
  3: "Khác",
};
const Settings = function ({ userInfo, dispatch }) {
  console.log(userInfo);
  const [fullname, setFullname] = useState(userInfo.fullName);
  const [dob, setDOB] = useState(moment(userInfo.dob));
  const [gender, setGender] = useState(userInfo.gender);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditDOB, setIsEditDOB] = useState(false);
  const [isEditGender, setIsEditGender] = useState(false);

  function onBlurEdit() {
    if (fullname.length < 1) {
      setFullname(userInfo.fullName);
      setIsEdit(false);
    } else {
      setIsEdit(false);
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    setFullname(value);
  }

  function changeUserInfo() {
    const data = {
      fullName: fullname,
      gender: gender,
      dob: dob.format("YYYY-MM-DD"),
    };
    apiChangeUserInfo(data).then((userInfo) => {
      dispatch(initUserInfo(userInfo));
      message.success("Thay đổi thông tin thành công!");
    });
  }

  function changePassword(data) {
    apiChangePassword(data).then((res) => {
      if (res && res.message) {
        message.error("Sai mật khẩu hiện tại!")
      } else {
        message.success("Đổi mật khẩu thành công!")
        resetToken()
        dispatch(setAuthenticate(false));
      }
    });
  }
  return (
    <DivSettings>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane tab="Chung" key="1">
          <List
            header={
              <div className="settings-header">Cài đặt tài khoản chung</div>
            }
            footer={
              <div className="settings-footer">
                <Button type="primary" onClick={changeUserInfo}>
                  Lưu
                </Button>
              </div>
            }
          >
            <Item>
              <label className="settings-item-label">Tên</label>
              {isEdit ? (
                <Input
                  value={fullname}
                  className="input-edit"
                  onChange={handleChange}
                  onBlur={onBlurEdit}
                  autoFocus
                />
              ) : (
                <span className="name">{fullname}</span>
              )}
              <span className="edit" onClick={() => setIsEdit(true)}>
                Chỉnh sửa
              </span>
            </Item>
            <Item>
              <label className="settings-item-label">Ngày sinh</label>
              {isEditDOB ? (
                <DatePicker
                  value={dob}
                  autoFocus={true}
                  format={"DD-MM-YYYY"}
                  disabled={!isEditDOB}
                  onBlur={() => setIsEditDOB(false)}
                  onChange={(date) => setDOB(date)}
                />
              ) : (
                <span className="name">{dob.format("DD-MM-YYYY")}</span>
              )}

              <span className="edit" onClick={() => setIsEditDOB(true)}>
                Chỉnh sửa
              </span>
            </Item>
            <Item>
              <label className="settings-item-label">Giới tính</label>
              {isEditGender ? (
                <Select
                  autoFocus={true}
                  placeholder={gender ? mapValueToGender[gender] : "Giới tính"}
                  onBlur={() => setIsEditGender(false)}
                  onChange={(value) => setGender(value)}
                >
                  <Option value={1}>Nam</Option>
                  <Option value={2}>Nữ</Option>
                  <Option value={3}>Khác</Option>
                </Select>
              ) : (
                <span className="name">{mapValueToGender[gender]}</span>
              )}
              <span className="edit" onClick={() => setIsEditGender(true)}>
                Chỉnh sửa
              </span>
            </Item>
          </List>
        </TabPane>

        <TabPane tab="Bảo mật" key="2">
          <div className="settings-header">Mật khẩu</div>
          <Divider />
          <Form onFinish={changePassword} scrollToFirstError>
            <Form.Item
              name="oldPassword"
              label={<label className="settings-item-label">Mật khẩu cũ</label>}
              rules={[
                {
                  required: true,
                  message: "Xin nhập mật khẩu hiện tại!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label={
                <label className="settings-item-label">Mật khẩu mới</label>
              }
              rules={[
                {
                  required: true,
                  message: "Xin nhập mật khẩu mới!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={<label className="settings-item-label">Xác nhận</label>}
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Xin hãy xác nhận mật khẩu mới!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu không khớp!");
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đổi
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </DivSettings>
  );
};

const DivSettings = styled.div`
  margin: auto;
  margin-top: 10px;
  width: 70%;
  height: 500px;
  background-color: white;
  padding: 10px;
  .settings-header {
    font-weight: bold;
    font-size: 20px;
    padding: 12px;
  }

  .settings-item-label {
    width: 30%;
    font-weight: bold;
  }
  .ant-form-item-required {
    width: 150px;
  }
  .name {
    font-weight: bold;
  }
  .edit {
    color: #216fdb;
  }

  .ant-list-item {
    padding: 10px;
    height: 50px;
  }
  .ant-list-item:hover {
    cursor: pointer;
    background-color: #d8dadf;
  }
  .input-edit {
    width: 40%;
  }
`;

export default connect((state) => ({ userInfo: state.user.info }))(Settings);
