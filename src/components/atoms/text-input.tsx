export interface TextInputProps {
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => any;
  error?: boolean;
  narrow?: boolean;
}

export default function TextInput({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  narrow,
}: TextInputProps) {
  return (
    <input
      data-error={!!error}
      data-narrow={!!narrow}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        flex flex-row items-center px-lg py-md rounded-rounded shadow-elevated
        data-[narrow=false]:w-[450px]
        data-[narrow=true]:w-[350px]
        data-[narrow=true]:text-center
        data-[narrow=true]:placeholder:text-center
        data-[narrow=true]:placeholder-shown:text-left
        border-[1px]
        border-color-accent
        text-color-primary
        placeholder:text-color-silenced
        bg-color-primary
        data-[error=true]:bg-color-warning
        font-clean text-md focus:outline-none
      "
    />
    // NOTE: removing outline on focus has some a11y drawbacks, consider using a different approach
    // https://www.a11yproject.com/posts/never-remove-css-outlines/#:%7E:text=Using%20the%20CSS%20rule%20%3Afocus,with%20the%20link%20or%20control.
  );
}
