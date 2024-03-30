import {
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteSkill } from "../redux/slices/skillSlice";
import {
  asyncDeleteTask,
  asyncСompleteTask,
} from "../redux/slices/taskSlice";
import MySelect from "../components/UI/MySelect";

const Skill = () => {
  const dispatch = useDispatch();
  const [relatedSkill, setRelatedSkill] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const skill = useSelector((s) => s.skill.skill);
  const task = useSelector((s) => s.task.tasks);
  useEffect(() => {
    if (task.length) {
      let t = [...task]
        .filter((e) => {
          return e.skillId === relatedSkill;
        })
        .sort((a, b) => a.lastTimeDone - b.lastTimeDone);

      setFilteredTasks(t);
    }
  }, [relatedSkill, task]);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="container">
      <div className="wrapper">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: 3,
          }}
        >
          {skill.length ? (
            <MySelect
              value={relatedSkill}
              setValue={setRelatedSkill}
              label={"Choose Skill"}
              options={skill.map((e) => {
                return { name: e.name, value: e.id };
              })}
            ></MySelect>
          ) : (
            "  add skill first"
          )}
        </Box>
        {relatedSkill && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              className="skill__list"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <div>
                {filteredTasks.length
                  ? filteredTasks.map((e, i) => {
                      let time =
                        Date.now() - new Date(e.lastTimeDone);
                      let days = e.lastTimeDone
                        ? Math.floor(time / (1000 * 60 * 60 * 24))
                        : null;
                      return (
                        <Accordion
                          expanded={expanded === `${i}`}
                          onChange={handleChange(`${i}`)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography>{e.name}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Last time done:
                              {days === null
                                ? "you havent done it yet"
                                : days
                                ? days + " days ago"
                                : Math.floor(
                                    time / (1000 * 60 * 60)
                                  ) + " hours ago"}
                            </Typography>

                            <Button
                              onClick={() =>
                                dispatch(asyncСompleteTask(e.id))
                              }
                              variant="contained"
                              sx={{ marginRight: 1 }}
                            >
                              done
                            </Button>
                            <Button
                              onClick={() =>
                                dispatch(asyncDeleteTask(e.id))
                              }
                              variant="contained"
                              color="error"
                            >
                              delete
                            </Button>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })
                  : "Добавь задания в этот скилл"}
              </div>
            </Box>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setRelatedSkill(null);
                dispatch(asyncDeleteSkill(relatedSkill));
              }}
            >
              delete skill
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Skill;
