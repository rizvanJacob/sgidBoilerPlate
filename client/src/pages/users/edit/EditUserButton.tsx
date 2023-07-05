import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../../App";
import { User } from "../../../@types/@types.user";
import EditIcon from "../../../assets/EditIcon";

export default function EditUserButton({ user }: { user: User }): JSX.Element {
  const currentUser = useContext(CurrentUserContext);

  return currentUser?.id !== user.id ? (
    <button className="btn btn-square border-primary btn-sm btn-secondary shadow-md">
      <Link to={`/users/${user.id}/edit`}>
        <EditIcon />
      </Link>
    </button>
  ) : (
    <> </>
  );
}
