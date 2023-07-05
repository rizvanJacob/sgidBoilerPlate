import { useContext, useEffect, useState } from "react";
import { AccountType, SigningUpUser, User } from "../../../@types/@types.user";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, putRequest } from "../../../utilities/fetchUtilities";
import { Form, Formik } from "formik";
import UserFieldset from "../../../components/fieldsets/UserFieldset";
import { TitleContext } from "../../../App";

const EditUserForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const navigate = useNavigate();
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) setTitle("Edit User");
    getRequest(`/api/users/${userId}`, setUser);
    getRequest("/api/users/accountTypes", setAccountTypes);
  }, []);

  const handleSubmit = async () => {
    if (!user) return;

    await putRequest(
      `/api/users/${userId}`,
      { ...user, approved: true },
      setUser
    );
    navigate("/users", { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const updatedUser = { ...user, [e.target.name]: e.target.value };
    setUser(updatedUser);
  };

  return (
    user && (
      <>
        <Formik initialValues={user} onSubmit={handleSubmit} enableReinitialize>
          {() => (
            <Form>
              <UserFieldset
                user={user as SigningUpUser}
                handleChange={handleChange}
              />
              {/* choose account type */}
              <select
                value={user.accountType}
                onChange={(e) => {
                  setUser({
                    ...user,
                    accountType: parseInt(e.target.value),
                  });
                }}
              >
                {accountTypes.map((accountType) => (
                  <option key={accountType.id} value={accountType.id}>
                    {accountType.name}
                  </option>
                ))}
              </select>
              <button>{user.approved ? "Update" : "Update & Approve"}</button>
            </Form>
          )}
        </Formik>
      </>
    )
  );
};

export default EditUserForm;
