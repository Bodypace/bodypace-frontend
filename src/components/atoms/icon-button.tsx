import Icon from "../icon";

export interface IconButtonProps {
  text: string;
  onClick: () => any;
}

export function IconButton({ text, onClick }: IconButtonProps) {
  return (
    <button
      className="
        flex items-center gap-md font-technical text-md text-color-primary
        [&:not(:hover)]:drop-shadow-elevated 
      "
      onClick={() => onClick()}
    >
      <Icon name="fa-circle-xmark-regular" />
      {text}
    </button>
  );
}
