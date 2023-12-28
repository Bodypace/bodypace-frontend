import React from "react";
import Icon, { type IconProps } from "../icon";

export interface ButtonProps {
  text: string;

  icon?: IconProps["name"];
  iconColor?: string;
  target?: string | (() => any);
  className?: string;

  center?: boolean;
  border?: boolean;
  small?: boolean;
  accent?: boolean;
}

export default function Button({
  text,
  icon,
  iconColor,
  target,
  className,
  center = false,
  border = true,
  small = false,
  accent = false,
}: ButtonProps) {
  const disabled = !target;

  const element = (
    <div
      data-center={center}
      data-border={border}
      data-small={small}
      data-accent={!!accent}
      data-disabled={!!disabled}
      className="
        flex flex-row items-center gap-sm p-md
        hover:cursor-pointer select-none
        data-[center=true]:justify-center
        data-[border=true]:border-color-primary data-[border=true]:border-[1px]
        data-[small=true]:py-sm
        data-[disabled=false]:data-[accent=false]:hover:bg-color-focus
        data-[disabled=false]:data-[accent=true]:hover:bg-color-accent
        data-[disabled=true]:border-color-silenced
        data-[disabled=true]:text-color-silenced
        data-[disabled=true]:hover:cursor-default
      "
    >
      {icon && (
        <Icon name={icon} small color={disabled ? undefined : iconColor} />
      )}
      <span className="text-md font-regular pl-sm">{text}</span>
    </div>
  );

  if (disabled) {
    return <div className={className}>{element}</div>;
  }

  if (typeof target === "string") {
    return (
      <a className={className} href={target}>
        {element}
      </a>
    );
  }

  return (
    <button className={className} onClick={target}>
      {element}
    </button>
  );
}
