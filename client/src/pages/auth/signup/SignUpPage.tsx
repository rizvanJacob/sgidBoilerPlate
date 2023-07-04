import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SigningUpUser } from "../../../@types/@types.user";
import { postRequest } from "../../../utilities/fetchUtilities";
import UserFieldset from "../../../components/fieldsets/UserFieldset";
import { Form, Formik } from "formik";

type FormikParams = {
  isSubmitting: boolean;
  isValidating: boolean;
  isValid: boolean;
};

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<SigningUpUser>({
    openId: location.state.openId,
  });

  const handleSubmit = async () => {
    const response = await postRequest("/api/users", user, undefined);

    if (response?.status === 200) {
      navigate("/", { replace: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      Request for an account
      <Formik initialValues={user} onSubmit={handleSubmit} enableReinitialize>
        {({ isSubmitting, isValidating, isValid }: FormikParams) => (
          <Form>
            <UserFieldset user={user} handleChange={handleChange} />
            <button>Sign Up</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpPage;
