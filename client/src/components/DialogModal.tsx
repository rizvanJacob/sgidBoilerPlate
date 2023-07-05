import { useRef, useEffect } from "react";

type Props = {
  title: string;
  message: string;
  isOpened: boolean;
  proceedButtonText?: string;
  onProceed: () => void;
  closeButtonText?: string;
  onClose: () => void;
};

const DialogModal = ({
  title,
  message,
  isOpened,
  proceedButtonText = "Proceed",
  onProceed,
  closeButtonText = "Close",
  onClose,
}: Props) => {
  const ref: any = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    }
  }, [isOpened]);

  const handleClose = () => {
    console.log("handle close");
    document.body.classList.remove("modal-open");
    ref.current?.close();
    onClose();
  };
  const proceedAndClose = () => {
    onProceed();
    handleClose();
  };

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <dialog
      className="modal opacity-100 pointer-events-auto"
      id={ref}
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <div
        className="card bg-warning p-4 flex flex-col gap-y-2 max-w-sm"
        onClick={preventAutoClose}
      >
        <h3 className="font-bold text-lg capitalize">{title}</h3>
        <p className="py-2 whitespace-normal break-normal text-left">
          {message}
        </p>
        <div className="flex justify-end gap-x-2">
          <button className="btn btn-primary btn-sm" onClick={handleClose}>
            {closeButtonText}
          </button>
          <button className="btn btn-primary btn-sm" onClick={proceedAndClose}>
            {proceedButtonText}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DialogModal;
