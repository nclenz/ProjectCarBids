import { Link } from "react-router-dom";
import RegisterAcc from "../components/RegisterAcc";

const SignUpPage = () => {
  return (
    <>
      <nav>
        <Link to="/">Back to Home</Link>
      </nav>
      <RegisterAcc />
    </>
  );
};

export default SignUpPage;
