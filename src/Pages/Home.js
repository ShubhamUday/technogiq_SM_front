import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <main className="main-area">
        <section className="left-section">
          <img
            src="https://smartstudent.app/media/2022/09/managment-software.png"
            alt="school-managment"
            width="500"
            height="600"
          ></img>
        </section>
        <section className="right-section">
          <h1>Welcome to School Management Application</h1>
          <p>
            The modern education technology provides us with a more practical
            and efficient set up for teaching techniques. In order to make
            classes more interesting and interactive, schools are now
            constructing a hybrid learning environment around the students.
          </p>
          <Button
            onClick={() => {
              navigate(`/shifter`);
            }}
            type="primary"
          >
            Get Started
          </Button>
        </section>
      </main>
      <div></div>
    </>
  );
}

export default Home;
