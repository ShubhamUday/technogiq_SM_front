import { Tabs } from "antd";
import DashBoard from "../Pages/admin/DashBoard";
import TeacherDash from "../Pages/teacher/TeacherDash";

const Test2 = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Movies",
      children: <DashBoard />,
    },
    {
      key: "2",
      label: "Theater Requests",
      children: <TeacherDash />,
    },
    // {
    //   key: '3',
    //   label: 'Tab 3',
    //   children: 'Content of Tab Pane 3',
    // },
  ];

  return (
    <>
      <h1>Welcome to Admin panel!</h1>
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default Test2;
