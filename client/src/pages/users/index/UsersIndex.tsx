import { useState, useEffect, useContext } from "react";
import ApprovedUsersList from "./components/ApprovedUsersList";
import UnapprovedUsersList from "./components/UnapprovedUsersList";
import { TitleContext } from "../../../App";
import PendingCollapseHeader from "./components/PendingCollapseHeader";
import { User } from "../../../@types/@types.user";
import { getRequest } from "../../../utilities/fetchUtilities";
import ProgressBar from "../../../components/ProgressBar";

export default function UsersIndex(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [showUnapproved, setShowUnapproved] = useState<boolean>(true);
  const setTitle = useContext<React.Dispatch<
    React.SetStateAction<string>
  > | null>(TitleContext);

  useEffect(() => {
    if (setTitle) {
      setTitle("Users Index");
    }
    getRequest(`/api/users`, setUsers);
  }, []);

  const unapprovedUsers = users.filter((user) => !user.approved);
  const approvedUsers = users.filter((user) => user.approved);

  return users.length ? (
    <>
      {unapprovedUsers.length > 0 ? (
        <div className="collapse">
          <input
            type="checkbox"
            checked={showUnapproved}
            onChange={() => {
              setShowUnapproved(!showUnapproved);
            }}
          />
          <PendingCollapseHeader showUnapproved={showUnapproved} />
          <div className="collapse-content p-0 overflow-auto flex-1 scrollbar-hide">
            <UnapprovedUsersList
              users={unapprovedUsers as User[]}
              setUsers={
                setUsers as React.Dispatch<React.SetStateAction<User[]>>
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <h1 className="text-lg font-bold self-start py-4"> Approved Users:</h1>
      <ApprovedUsersList users={approvedUsers} setUsers={setUsers} />
    </>
  ) : (
    <ProgressBar />
  );
}
