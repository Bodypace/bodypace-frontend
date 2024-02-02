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
        flex justify-center items-center px-newDSlg py-newDSmd rounded-newDSminimal shadow-elevated
        w-[280px] data-[wide=true]:w-[450px] 
        text-color-primary data-[disabled=true]:text-color-silenced
        bg-color-newDSaccent data-[disabled=true]:bg-color-newDSsilenced
        data-[disabled=false]:hover:bg-color-newDSfocus
        hover:cursor-pointer data-[disabled=true]:hover:cursor-default
        select-none
      "
    >
      <span className="font-brand text-newDSsm">{text}</span>
    </div>
  );

  if (disabled) {
    return <div>{element}</div>;
  }

  if (typeof onClick === "string") {
    return <a href={onClick}>{element}</a>;
  }

  return <button onClick={onClick}>{element}</button>;
}
