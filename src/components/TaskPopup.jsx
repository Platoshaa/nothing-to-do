import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MySelect from "./UI/MySelect";
import { asyncCreateNewTask } from "../redux/slices/taskSlice";

const TaskPopup = ({ setIsTaskOpen }) => {
  const [relatedSkill, setRelatedSkill] = useState("");
  const [nameItem, setNameItem] = useState("");
  const dispatch = useDispatch();
  const skill = useSelector((s) => s.skill.skill);
  return (
    <>
      <h2>Add New Task</h2>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        required
        sx={{ mb: 2 }}
        value={nameItem}
        onChange={(e) => setNameItem(e.target.value)}
      />

      {skill.length ? (
        <>
          <MySelect
            value={relatedSkill}
            setValue={setRelatedSkill}
            label={"Related Skill"}
            options={skill.map((e) => {
              return { name: e.name, value: e.id };
            })}
          ></MySelect>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(asyncCreateNewTask(nameItem, relatedSkill));
                setNameItem("");
              }}
            >
              add new task
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsTaskOpen(false)}
              sx={{}}
            >
              add a skill
            </Button>
          </div>
        </>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsTaskOpen(false)}
          sx={{}}
        >
          you should add a skill at first
        </Button>
      )}
    </>
  );
};

export default TaskPopup;
