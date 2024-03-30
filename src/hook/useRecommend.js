import { useMemo } from "react";

const useFilteredSkill = (skill) => {
  return useMemo(
    () => [...skill].filter((e) => e.isRecommend).map((e) => e.id),
    [skill]
  );
};
const useSortedTasks = (task) =>
  useMemo(
    () =>
      [...task].sort(
        (a, b) => Number(b.lastTimeDone) - Number(a.lastTimeDone)
      ),
    [task]
  );
export const useRecommend = (t, s) => {
  const sortedTasks = useSortedTasks(t);
  const filteredSkill = useFilteredSkill(s);
  return useMemo(() => {
    return [...sortedTasks].filter(
      (e) => filteredSkill.indexOf(e.skillId) >= 0
    );
  }, [sortedTasks, filteredSkill]);
};
