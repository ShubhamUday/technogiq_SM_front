import { message, Modal } from "antd";
import React from "react";
import { deleteStudent } from "../../apicalls/students";

function DeleteStudentModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedStudent,
  setSelectedStudent,
  getData,
}) {
    
  const handleOk = async () => {
    try {
      const studentId = selectedStudent._id;
      const response = await deleteStudent({ studentId });
      console.log(studentId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedStudent(null);
      }
      setIsDeleteModalOpen(false);
    } catch (err) {
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <Modal
        title="Delete student?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this student?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this movie data.
        </p>
      </Modal>
    </>
  );
}

export default DeleteStudentModal;
