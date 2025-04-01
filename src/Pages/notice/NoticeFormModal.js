import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { addNotice, updateNotice } from "../../apicalls/notices";

function NoticeFormModal({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedNotice,
  setSelectedNotice,
  getData,
}) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    try {
      let response = null;
      if (formType === "add") {
        response = await addNotice(values);
      } else {
        response = await updateNotice({
          ...values,
          noticeId: selectedNotice._id,
        });
      }
      console.log(response);
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };
  return (
    <Modal
      centered
      title={formType === "add" ? "Add Notice" : "Edit Notice"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedNotice}
        onFinish={onFinish}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Topic"
              htmlFor="topic"
              name="topic"
              className="d-block"
              rules={[{ required: true, message: "Topic is required!" }]}
            >
              <Input
                id="topic"
                type="text"
                placeholder="Enter the topic"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              htmlFor="description"
              name="description"
              className="d-block"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea
                id="description"
                rows="4"
                placeholder="Enter the  description"
              ></TextArea>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NoticeFormModal;
