import { Box } from "@mui/material";
import React, { useState } from "react";

function InputNumber({
  value = null,
  minusOne = null,
  plusOne = null,
  id,
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        style={{ padding: "10px" }}
        data-id={id}
        onClick={minusOne}
      >
        -
      </button>
      <Box sx={{ paddingX: 1 }}>{value}</Box>
      <button
        style={{ padding: "10px" }}
        data-id={id}
        onClick={plusOne}
      >
        +
      </button>
    </div>
  );
}
export default InputNumber;
