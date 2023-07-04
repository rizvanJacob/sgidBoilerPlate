import { useState, useContext } from "react";
import { User } from "../../../../@types/@types.user";
import { CurrentUserContext } from "../../../../App";
import { deleteRequest } from "../../../../utilities/fetchUtilities";
import DialogModal from "../../../../components/DialogModal";

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
    setShowModal(true);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
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
