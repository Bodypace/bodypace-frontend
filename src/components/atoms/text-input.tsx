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
        border-[1px] border-color-newDSaccent
        text-color-primary placeholder:text-color-silenced
        bg-color-newDSprimary data-[error=true]:bg-color-newDSwarning
        font-clean text-newDSmd focus:outline-none
      "
    />
    // NOTE: removing outline on focus has some a11y drawbacks, consider using a different approach
    // https://www.a11yproject.com/posts/never-remove-css-outlines/#:%7E:text=Using%20the%20CSS%20rule%20%3Afocus,with%20the%20link%20or%20control.
  );
}
