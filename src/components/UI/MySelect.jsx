import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const MySelect = ({
  value,
  label,
  setValue,
  title,
  options = [],
}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      {" "}
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          {options.map((e) => (
            <MenuItem value={e.value} key={e.value}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MySelect;
