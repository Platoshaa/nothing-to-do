import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddSkill } from "../redux/slices/skillSlice";

const SkillPopup = ({ setIsTaskOpen }) => {
  const [nameItem, setNameItem] = useState("");
  const [isRecommend, setIsRecommend] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <h2>Add New Skill</h2>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        required
        sx={{ mb: 2 }}
        value={nameItem}
        onChange={(e) => setNameItem(e.target.value)}
      />
      <FormControlLabel
        sx={{ marginBottom: 1 }}
        control={
          <Checkbox
            checked={isRecommend}
            onChange={() => setIsRecommend((prev) => !prev)}
          />
        }
        label="Recommend this skill"
      />
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(asyncAddSkill(nameItem, isRecommend));
            setNameItem("");
          }}
          sx={{}}
        >
          add new skill
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsTaskOpen(true)}
          sx={{}}
          color="secondary"
        >
          add task
        </Button>
      </div>
    </>
  );
};

export default SkillPopup;
