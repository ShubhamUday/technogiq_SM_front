import React, { useState } from "react";
import { Radio, Tabs } from "antd";

const Tab = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        style={{ height: 220 }}
        items={Array.from({ length: 30 }, (_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  );
};
export default Tab;
