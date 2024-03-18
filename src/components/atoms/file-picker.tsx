import React from "react";

export interface FilePickerProps {
  onFilesPicked: (files: FileList | null) => void;
}

export const FilePicker = React.forwardRef(function FilePicker(
  { onFilesPicked }: FilePickerProps,
  inputFileRef: React.Ref<HTMLInputElement>,
) {
  const inputFileListenerInstalled = React.useRef(false);

  const handleFiles = function handleFiles(this: HTMLInputElement) {
    const fileList = this.files;
    onFilesPicked(fileList);
  };

  React.useEffect(() => {
    if (inputFileListenerInstalled.current) return;

    if (
      inputFileRef &&
      typeof inputFileRef !== "function" &&
      inputFileRef.current
    ) {
      const handler = handleFiles;
      const input = inputFileRef.current;

      input.addEventListener("change", handler, false);
      inputFileListenerInstalled.current = true;

      return () => {
        input.removeEventListener("change", handler, false);
        inputFileListenerInstalled.current = false;
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      ref={inputFileRef}
      type="file"
      multiple
      style={{ display: "none" }}
    />
  );
});
