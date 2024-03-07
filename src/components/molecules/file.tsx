import Checkbox, { type CheckboxProps } from "../atoms/checkbox";

export interface FileProps {
  encrypted: boolean;
  no: number;
  filename: string;
  // size: string;
  checked: CheckboxProps["checked"];
  onChange: CheckboxProps["onChange"];
}

export function File({
  encrypted,
  no,
  filename,
  // size,
  checked,
  onChange,
}: FileProps) {
  // TODO: fix double clicking on checkbox highlights filename text.
  // (quickly clicking checkbox twice should not hightlight the filename text)
  return (
    <div
      className="
        flex items-center w-[800px] min-h-[69px] py-sm gap-md border-b-[1px] border-color-accent
      "
    >
      <span className="font-technical text-md text-color-primary">{no}.</span>
      <Checkbox
        labelledBy={`file-no-${no}`}
        checked={checked}
        onChange={onChange}
        small
      />
      <label
        id={`file-no-${no}`}
        data-encrypted={!!encrypted}
        className="
          text-lg text-color-primary
          data-[encrypted=true]:font-ciphertext
          data-[encrypted=false]:font-plaintext
        "
      >
        {filename}
      </label>
      <div className="flex flex-1" />
      <span className="w-[100px] font-technical text-md text-color-primary">
        {/* NOTE: Backend does not provide the size of the files yet */}
        {/* {size} */}
      </span>
    </div>
  );
}
