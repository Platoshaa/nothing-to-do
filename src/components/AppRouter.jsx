import { Route, Routes } from "react-router-dom";
import Skill from "../pages/Skills";
import { useSelector } from "react-redux";
import Login from "../pages/LogIn";
import { Box } from "@mui/material";
import Recommendation from "../pages/Recommendation";

const AppRouter = () => {
  const a = useSelector((s) => s.auth);
  return (
    <Box sx={{ width: 1 }}>
      <Routes>
        {!a.email ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Recommendation />} />
            <Route path="/skill" element={<Skill />} />
          </>
        )}
      </Routes>
    </Box>
  );
};

export default AppRouter;
