import React from "react";

export interface ButtonProps {
  text: string;
  wide?: boolean;
  onClick?: string | (() => any);
}

export default function Button({ text, wide = false, onClick }: ButtonProps) {
  const disabled = !onClick;

  const element = (
    <div
      data-wide={!!wide}
      data-disabled={!!disabled}
      className="
        flex justify-center items-center px-lg py-md rounded-minimal shadow-elevated
        w-[280px] data-[wide=true]:w-[450px] 
        text-color-primary data-[disabled=true]:text-color-silenced
        bg-color-accent data-[disabled=true]:bg-color-silenced
        data-[disabled=false]:hover:bg-color-focus
        hover:cursor-pointer data-[disabled=true]:hover:cursor-default
        select-none
      "
    >
      <span className="font-brand text-sm">{text}</span>
    </div>
  );

  if (typeof onClick === "string") {
    return disabled ? <div>{element}</div> : <a href={onClick}>{element}</a>;
  }

  return (
    <button onClick={onClick} disabled={disabled}>
      {element}
    </button>
  );
}
