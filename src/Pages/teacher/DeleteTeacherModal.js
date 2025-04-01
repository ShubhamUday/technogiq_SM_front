import { message, Modal } from "antd";
import React from "react";
import { deleteTeacher } from "../../apicalls/teachers";

function DeleteTeacherModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTeacher,
  setSelectedTeacher,
  getData,
}) {
    
  const handleOk = async () => {
    try {
      const teacherId = selectedTeacher._id;
      const response = await deleteTeacher({ teacherId });
      console.log(teacherId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedTeacher(null);
      }
      setIsDeleteModalOpen(false);
    } catch (err) {
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <>
      <Modal
        title="Delete Teacher?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this teacher?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this movie data.
        </p>
      </Modal>
    </>
  );
}

export default DeleteTeacherModal;
