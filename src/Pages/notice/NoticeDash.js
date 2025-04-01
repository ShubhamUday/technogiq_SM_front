import React, { useEffect, useState } from "react";
import { getAllNotices } from "../../apicalls/notices";
import { Button, message, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import NoticeFormModal from "./NoticeFormModal";
import DeleteNoticeModal from "./DeleteNoticeModal";

function NoticeDash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [notices, setNotices] = useState(null);

  const getData = async () => {
    try {
      const response = await getAllNotices();
      if (response.success) {
        const allNotices = response.data;
        setNotices(
          allNotices.map(function (item) {
            return { ...item, key: `notice${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedNotice(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Notice
        </Button>
      </div>

      <Table dataSource={notices} columns={columns} />

      {isModalOpen && (
        <NoticeFormModal
          isModalOpen={isModalOpen}
          selectedNotice={selectedNotice}
          setSelectedNotice={setSelectedNotice}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteNoticeModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedNotice={selectedNotice}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedNotice={setSelectedNotice}
          getData={getData}
        />
      )}
    </>
  );
}

export default NoticeDash;
