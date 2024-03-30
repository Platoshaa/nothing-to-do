import { useDispatch, useSelector } from "react-redux";
import { asyncSignOut, signIn } from "../../redux/slices/authSlice";
import Button from "@mui/material/Button";
const AuthBtn = () => {
  const auth = useSelector((s) => s.auth.email);
  const dispatch = useDispatch();
  return (
    <Button
      className=""
      variant="contained"
      onClick={() => dispatch(auth ? asyncSignOut() : signIn())}
      sx={{ color: "#fff" }}
    >
      {auth ? "Sign out" : "Sign in"}
    </Button>
  );
};

export default AuthBtn;
