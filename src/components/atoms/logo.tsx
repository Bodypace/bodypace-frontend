import Icon from "../icon";

export default function Logo() {
  return (
    <div className="group flex flex-row items-center gap-newDSsm">
      <Icon name="logo" elevated />
      <span className="font-clean text-newDSlg font-light select-none text-color-primary drop-shadow-elevated">
        Bodypace
      </span>
    </div>
  );
}
