import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { addTeacher, updateTeacher } from "../../apicalls/teachers";

function TeacherFormModal({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedTeacher,
  setSelectedTeacher,
  getData,
}) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    try {
      let response = null;
      if (formType === "add") {
        response = await addTeacher(values);
      } else {
        response = await updateTeacher({
          ...values,
          teacherId: selectedTeacher._id,
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
    setSelectedTeacher(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Teacher" : "Edit Teacher"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedTeacher}
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
              label="Name"
              htmlFor="title"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Teacher name is required!" }]}
            >
              <Input
                id="name"
                type="text"
                placeholder="Enter the teacher name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              htmlFor="address"
              name="address"
              className="d-block"
              rules={[{ required: true, message: "Address is required!" }]}
            >
              <TextArea
                id="address"
                rows="4"
                placeholder="Enter the  Address"
              ></TextArea>
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
                    { required: true, message: "Teacher Number is required!" },
                  ]}
                >
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter the teacher number"
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
                  label="Work Experience"
                  htmlFor="workExperience"
                  name="workExperience"
                  className="d-block"
                  rules={[
                    { required: true, message: "Experience is required!" },
                  ]}
                >
                  <Input
                    id="workExperience"
                    type="text"
                    placeholder="Enter the work experience"
                  ></Input>
                </Form.Item>
              </Col>
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
                    defaultValue="class"
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

export default TeacherFormModal;
