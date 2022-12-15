import { Link } from "react-router-dom";
import RegisterAcc from "../../components/RegisterAcc";

const UserSignUpPage = () => {
  return (
    <>
      <nav>
        <Link to="/">Back to Home</Link>
      </nav>
      <h1> User Sign up page</h1>
      <RegisterAcc />
    </>
  );
};

export default UserSignUpPage;
