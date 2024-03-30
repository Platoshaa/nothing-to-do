import AuthBtn from "../components/UI/AuthBtn";
import s from "./Login.module.scss";

const Login = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <p className={s.textAttention}>only google account</p>
        <p
          style={{
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          there are skills you want to improve. Divide them on tasks.
          And simply track when you complete your tasks
        </p>
      </div>
    </div>
  );
};

export default Login;
