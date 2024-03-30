import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { asyncСompleteTask } from "../redux/slices/taskSlice";
import { useRecommend } from "../hook/useRecommend";
import { useEffect, useState } from "react";
const Recommendation = () => {
  const task = useSelector((s) => s.task.tasks);
  const skill = useSelector((s) => s.skill.skill);
  const dispatch = useDispatch();
  const recommendationList = useRecommend(task, skill);
  const [recomendationTask, setRecomendationTask] = useState();
  useEffect(() => {
    if (recommendationList.length) {
      let lastTask =
        recommendationList[recommendationList.length - 1];
      setRecomendationTask({
        ...lastTask,
        skillName: skill.find((e) => e.id === lastTask.skillId).name,
      });
    }
  }, [recommendationList]);
  return (
    <div className="container">
      <div className="wrapper ">
        <div>
          {recomendationTask && (
            <>
              You haven't done it for a while:
              <Button
                onClick={() =>
                  dispatch(asyncСompleteTask(recomendationTask.id))
                }
              >
                {recomendationTask.name +
                  " - from: " +
                  recomendationTask.skillName}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
