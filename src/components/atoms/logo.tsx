import Icon from "../icon";

export interface LogoProps {
  small?: boolean;
}

export default function Logo({ small = false }: LogoProps) {
  return (
    <div
      data-small={small}
      className="group flex flex-row items-center gap-md data-[small=true]:gap-sm"
    >
      <Icon name="bodypace" small={small} />
      <span
        className="
        font-light text-3xl group-data-[small=true]:text-lg select-none text-color-primary
      "
      >
        Bodypace
      </span>
    </div>
  );
}
