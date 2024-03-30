import { useEffect, useState } from "react";
import { asyncGetAllTasks } from "../redux/slices/taskSlice";
import { asyncGetSkills } from "../redux/slices/skillSlice";
import { useDispatch } from "react-redux";
import { Box, Container, Modal } from "@mui/material";

import PopupButtons from "./PopupButtons";
import TaskPopup from "./TaskPopup";
import SkillPopup from "./SkillPopup";
const ItemCreator = () => {
  const dispatch = useDispatch();
  const [isTaskOpen, setIsTaskOpen] = useState(null);

  const [popupIsOpen, setPopupIsOpen] = useState(false);

  useEffect(() => {
    if (isTaskOpen !== null) {
      setPopupIsOpen(true);
    }
  }, [isTaskOpen]);
  useEffect(() => {
    dispatch(asyncGetSkills());
    dispatch(asyncGetAllTasks());
  }, []);

  return (
    <>
      <Modal
        open={popupIsOpen}
        onClose={() => {
          setIsTaskOpen(null);
          setPopupIsOpen(false);
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 1 / 2,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              background: "#fff",
              p: 2,
            }}
          >
            {isTaskOpen ? (
              <TaskPopup setIsTaskOpen={setIsTaskOpen} />
            ) : (
              <SkillPopup setIsTaskOpen={setIsTaskOpen} />
            )}
          </Box>
        </Container>
      </Modal>

      <PopupButtons setIsTaskOpen={setIsTaskOpen} />
    </>
  );
};

export default ItemCreator;
