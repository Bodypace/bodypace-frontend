import React from "react";

export interface DialogProps {
  open: boolean;
  children: React.ReactNode;
}

export default function Dialog({ open, children }: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="animate-slideUp rounded-rounded shadow-elevated backdrop:bg-color-transparent"
    >
      {children}
    </dialog>
  );
}
