import { useState, useContext } from "react";
import { User } from "../../../../@types/@types.user";
import { CurrentUserContext } from "../../../../App";
import { deleteRequest } from "../../../../utilities/fetchUtilities";
import DialogModal from "../../../../components/DialogModal";
import DeleteIcon from "../../../../assets/DeleteIcon";

export default function DeleteUserButton({
  setUsers,
  user,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User;
}) {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    console.log("attempt to open modal");
    setShowModal(true);
    console.log("modal true");
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRequest(`/api/users/${user.id}`, user.id, setUsers);
    } catch (err) {
      console.error(err);
    }
  };

  return currentUser?.id !== user.id ? (
    <>
      <button
        onClick={handleClick}
        className="btn btn-square border-primary btn-secondary btn-sm shadow-md text-red-500"
      >
        <DeleteIcon />
      </button>

      {showModal && (
        <DialogModal
          title="Delete this user?"
          message={`Are you sure you want to delete ${user.displayName}? This action cannot be undone.`}
          isOpened={showModal}
          proceedButtonText="Delete"
          onProceed={handleConfirmDelete}
          closeButtonText="Cancel"
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  ) : (
    <></>
  );
}
