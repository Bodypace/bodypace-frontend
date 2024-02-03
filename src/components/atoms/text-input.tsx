export interface TextInputProps {
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  onChange: (arg0: string) => any;
  error?: boolean;
}

export default function TextInput({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: TextInputProps) {
  return (
    <input
      data-error={!!error}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        flex flex-row items-center px-newDSlg py-newDSmd rounded-newDSrounded shadow-elevated
        w-[450px]
        data-[error=false]:border-[1px] border-color-newDSaccent
        text-color-primary placeholder:text-color-silenced
        bg-color-newDSprimary data-[error=true]:bg-color-warning
        font-clean text-newDSmd
      "
    />
  );
}
