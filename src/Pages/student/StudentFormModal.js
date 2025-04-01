import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React from "react";
import { addStudent, updateStudent } from "../../apicalls/students";

function StudentFormModal({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedStudent,
  setSelectedStudent,
  getData,
}) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    try {
      let response = null;
      if (formType === "add") {
        response = await addStudent(values);
      } else {
        response = await updateStudent({
          ...values,
          studentId: selectedStudent._id,
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
    setSelectedStudent(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Student" : "Edit Student"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedStudent}
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
              label="Student Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Student name is required!" }]}
            >
              <Input
                id="name"
                type="text"
                placeholder="Enter the student name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required!" }]}
            >
              <Input
                id="password"
                type="text"
                placeholder="Enter student password"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label="Number"
                  htmlFor="number"
                  name="number"
                  className="d-block"
                  rules={[
                    { required: true, message: "Student Number is required!" },
                  ]}
                >
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter the student number"
                  ></Input>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Gender"
                  htmlFor="gender"
                  name="gender"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Gender is required!",
                    },
                  ]}
                >
                  <Input id="gender" type="text" placeholder="Gender"></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label="Select Class"
                  htmlFor="class"
                  name="class"
                  className="d-block"
                  rules={[{ required: true, message: "Class is required!" }]}
                >
                  <Select
                    id="class"
                    defaultValue="Class"
                    style={{ width: "100%", height: "45px" }}
                    onChange={handleChange}
                    options={[
                      { value: "1st", label: "Class 1st" },
                      { value: "2nd", label: "Class 2nd" },
                      { value: "3rd", label: "Class 3rd" },
                      { value: "4th", label: "Class 4th" },
                      { value: "5th", label: "Class 5th" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
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

export default StudentFormModal;
