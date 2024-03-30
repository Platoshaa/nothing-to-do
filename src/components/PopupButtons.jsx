import { Box } from "@mui/material";
import Btn from "./UI/Btn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
const PopupButtons = ({ setIsTaskOpen }) => {
  const [addBtnActive, setAddBtnActive] = useState(false);
  const showButtons = () => {
    setAddBtnActive(!addBtnActive);
  };
  return (
    <Box
      className="btns"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        position: "absolute",

        bottom: 0,
      }}
    >
      {addBtnActive ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 50,
            overflow: "hidden",
          }}
        >
          <Btn onClick={() => setIsTaskOpen(false)}>skill</Btn>
          <Btn onClick={() => setIsTaskOpen(true)} sx={{}}>
            task
          </Btn>
        </Box>
      ) : (
        ""
      )}
      <Btn onClick={showButtons} sx={{}}>
        <AddCircleIcon
          color="primary"
          size="large"
          sx={{ fontSize: "2.5em" }}
        ></AddCircleIcon>
      </Btn>
    </Box>
  );
};

export default PopupButtons;
