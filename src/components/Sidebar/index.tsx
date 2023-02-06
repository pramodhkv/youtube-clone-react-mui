import React, { SetStateAction, useState } from "react";
import { Stack } from "@mui/material";

import { categories } from "../../utils/constants";

interface ISidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: SetStateAction<string>) => void;
}

const Sidebar = (props: ISidebarProps) => {
  const { selectedCategory, setSelectedCategory } = props;

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: {
          sm: "auto",
          md: "95%",
        },
        flexDirection: {
          md: "column",
        },
      }}
    >
      {categories.map((category) => (
        <button
          key={category.name}
          className="category-btn"
          style={{
            background: selectedCategory === category.name ? "#fc1503" : "",
            color: "#fff",
          }}
          onClick={() => setSelectedCategory(category.name)}
        >
          <span
            style={{
              color: selectedCategory === category.name ? "#fff" : "red",
              marginRight: "1rem",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: selectedCategory === category.name ? 1 : 0.8,
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
