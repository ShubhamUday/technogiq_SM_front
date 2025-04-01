import { message, Modal } from "antd";
import React from "react";
import { deleteNotice } from "../../apicalls/notices";

function DeleteNoticeModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedNotice,
  setSelectedNotice,
  getData,
}) {
  const handleOk = async () => {
    try {
      const noticeId = selectedNotice._id;
      const response = await deleteNotice({ noticeId });
      
      console.log(noticeId, response);

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedNotice(null);
      }
      setIsDeleteModalOpen(false);
    } catch (err) {
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedNotice(null);
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
          Are you sure you want to delete this notice?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this notice data.
        </p>
      </Modal>
    </>
  );
}

export default DeleteNoticeModal;
