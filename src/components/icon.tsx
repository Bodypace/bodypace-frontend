import Image from "next/image";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { faLinux } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const icons = {
  apple: faApple,
  windows: faWindows,
  linux: faLinux,
  android: faAndroid,
};

export interface IconProps {
  small?: boolean;
  name: keyof typeof icons | "bodypace";
  color?: string;
}

export default function Icon({ small = false, name, color }: IconProps) {
  const size = small ? 32 : 64;

  if (name === "bodypace") {
    return (
      <Image
        src="/heart.png" // replace with .svg
        alt="Bodypace logo"
        width={size}
        height={size}
        priority
      />
    );
  }

  const icon = icons[name];
  const sizeClass = small ? "w-[32px] h-[32px]" : "w-[64px] h-[64px]";

  return <FontAwesomeIcon icon={icon} className={sizeClass} color={color} />;
}
