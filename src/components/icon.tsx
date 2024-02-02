import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faKey,
  faShield,
  faTriangleExclamation,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const colors = {
  borderPrimary: "#202020",
  surfaceWarning: "#FCEDCF",
};

const icons = {
  "fa-circle-xmark-regular": {
    icon: faXmarkCircle,
    width: "w-[20px]",
    height: "h-[20px]",
    color: colors.borderPrimary,
  },
  "fa-key-solid": {
    icon: faKey,
    width: "w-[20px]",
    height: "h-[20px]",
    color: colors.borderPrimary,
  },
  "fa-shield-solid": {
    icon: faShield,
    width: "w-[18px]",
    height: "h-[20px]",
    color: colors.borderPrimary,
  },
  "fa-triangle-exclamation-solid": {
    icon: faTriangleExclamation,
    width: "w-[25px]",
    height: "h-[22px]",
    color: colors.surfaceWarning,
  },
  "fa-check-solid": {
    icon: faCheck,
    width: "w-[18px]",
    height: "h-[15px]",
    color: colors.borderPrimary,
  },
};

export interface IconProps {
  name: keyof typeof icons | "logo";
  elevated?: boolean;
}

export default function Icon({ name, elevated = false }: IconProps) {
  const dropShadow = elevated ? "drop-shadow-elevated" : "";

  if (name === "logo") {
    return (
      <Image
        src="/heart.png" // replace with .svg
        alt="Bodypace logo"
        width={32}
        height={32}
        priority
        className={dropShadow}
      />
    );
  }

  const { icon, width, height, color } = icons[name];
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${width} ${height} ${dropShadow}`}
      color={color}
    />
  );
}
