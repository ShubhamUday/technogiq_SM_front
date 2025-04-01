import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Shifter() {
  const navigate = useNavigate();
  return (
    <>
      <section className="shifter-area">
        <Button
          onClick={() => {
            navigate(`/admin`);
          }}
        >
          Admin
        </Button>
        <Button
          onClick={() => {
            navigate(`/teacher`);
          }}
        >
          Teacher
        </Button>
        <Button
          onClick={() => {
            navigate(`/student`);
          }}
        >
          Student
        </Button>
      </section>
    </>
  );
}

export default Shifter;
