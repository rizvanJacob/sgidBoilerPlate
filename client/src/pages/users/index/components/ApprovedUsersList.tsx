import EditUserButton from "../../edit/EditUserButton";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../App";
import { User } from "../../../../@types/@types.user";
import UserTableRow from "./UserTableRow";
import DeleteUserButton from "./DeleteUserButton";

export type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export default function ApprovedUsersList({
  users,
  setUsers,
}: UsersListProps): JSX.Element {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="overflow-y-auto overflow-x-clip flex-1 scrollbar-hide">
      <table className="table w-full">
        <UserTableRow />
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user: User) => {
            const accountType = user.accountType;
            let accountTypeClass = "";
            switch (accountType) {
              case "Admin":
                accountTypeClass = "text-amber-950";
                break;
              case "User":
                accountTypeClass = "text-lime-950";
                break;
            }
            return (
              <tr key={user.id} className="hover:bg-gray-100 h-max">
                <td className="px-2 py-4 whitespace-nowrap text-center overflow-clip text-sm font-medium text-slate-950">
                  {user.displayName}
                </td>
                <td
                  className={`px-2 py-4 whitespace-nowrap text-center text-sm hidden md:table-cell ${accountTypeClass}`}
                >
                  {user.accountType}
                </td>
                {currentUser?.id !== user.id ? (
                  <td className="py-2 text-center whitespace-nowrap">
                    <div className="btn-group flex items-center justify-center">
                      <EditUserButton user={user} />
                      <DeleteUserButton setUsers={setUsers} user={user} />
                    </div>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
