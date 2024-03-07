import { IconButton } from "../atoms/icon-button";
import { File as FileComponent } from "../molecules/file";
import { useFiles, type File } from "@/lib/files";

export interface FilesProps {
  selected?: Set<File["id"]>;
  onSelected: (id: File["id"], selected: boolean) => any;
  onClearSelection: () => any;
}

export function Files({ selected, onSelected, onClearSelection }: FilesProps) {
  const { files } = useFiles();
  const hasElements = Array.isArray(files) && files.length > 0;

  // prettier-ignore
  const message =
    files === undefined         ? "Loading files..." :
    files === "decrypting"      ? "Decrypting filenames..." :
    files === "fetch-error"     ? "Failed to load files, refresh page to try again" :
    files === "account-missing" ? "Login to see your files" :
                                  "Your list of files is empty"

  return (
    <div className="flex flex-col items-center gap-sm">
      <div className="flex w-full items-center justify-between pl-2xl pr-lg py-sm">
        {hasElements && selected?.size ? (
          <IconButton text="clear selection" onClick={onClearSelection} />
        ) : (
          <div></div>
        )}
        <span className="font-technical text-md text-color-primary">
          {/* NOTE: Backend does not provide the size of the files yet */}
          {/* {files.length > 0 ? "? GB used, ? GB available" : "10 GB available"} */}
          &nbsp;
        </span>
      </div>
      {/* TODO: add scrollbar-gutter and/or other code to avoid width difference 
      between not scrollable list of few files, and scrollable list of many file
      (right now scrollbar is shown only when needed and it takes extra width then) */}
      <div
        className="
          flex flex-col items-center h-[665px] overflow-auto rounded-rounded p-lg
          bg-color-primary shadow-elevated
          border-[1px] border-color-accent
        "
      >
        {hasElements ? (
          files.map((file, index) => (
            <FileComponent
              key={file.id}
              encrypted={!file.nameDecrypted}
              no={index + 1}
              filename={file.nameDecrypted || "cant-decrypt-file-name"}
              checked={selected ? selected.has(file.id) : false}
              onChange={() => onSelected(file.id, !selected?.has(file.id))}
            />
          ))
        ) : (
          <span
            className="
              flex items-center justify-center w-[800px] h-full
              font-technical text-lg text-color-silenced
            "
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
