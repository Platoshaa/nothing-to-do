import { createSlice } from "@reduxjs/toolkit";
import { skillAPI } from "../../api";
const initialState = {
  skill: [],
};
const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkills(state, action) {
      state.skill = action.payload;
    },
  },
});
export const { setSkills } = skillSlice.actions;
export default skillSlice.reducer;

export const asyncGetSkills = () => {
  return (dispatch) => {
    skillAPI.getSkills().then((r) => {
      if (r) {
        dispatch(setSkills(Array.from(new Set([...r]))));
      }
    });
  };
};
export const asyncDeleteSkill = (id) => {
  return (dispatch) => {
    skillAPI.deleteSkill(id).then((r) => {
      if (r) {
        dispatch(setSkills(Array.from(new Set([...r]))));
      }
    });
  };
};
export const asyncAddSkill = (name, isRecommend) => (dispatch) => {
  skillAPI.addSkill(name, isRecommend).then((r) => {
    if (r) {
      dispatch(setSkills(Array.from(new Set([...r]))));
    }
  });
};
