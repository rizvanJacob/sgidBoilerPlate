import { User } from "../../../../@types/@types.user";
import EditUserButton from "../../edit/EditUserButton";
import DeleteUserButton from "./DeleteUserButton";
import UserTableRow from "./UserTableRow";

export type UsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export default function UnapprovedUsersList({
  users,
  setUsers,
}: UsersListProps): JSX.Element {
  return (
    <div className="h-40 overflow-x-clip">
      <table className="table w-full">
        <UserTableRow />
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user: User) => {
            return (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-2 py-4 whitespace-nowrap text-center overflow-clip text-sm font-medium text-slate-950">
                  {user.displayName}
                </td>
                <td
                  className={`px-2 py-4 whitespace-nowrap text-center text-sm hidden md:table-cell text-slate-950`}
                >
                  {user.accountType}
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  <div className="btn-group flex items-center justify-center">
                    <EditUserButton user={user} />
                    <DeleteUserButton setUsers={setUsers} user={user} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
