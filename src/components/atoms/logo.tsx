import Icon from "../icon";

export default function Logo() {
  return (
    <div className="group flex flex-row items-center gap-sm">
      <Icon name="logo" elevated />
      <span
        className="font-clean text-lg font-light select-none text-color-primary drop-shadow-elevated"
        translate="no"
      >
        Bodypace
      </span>
    </div>
  );
}
