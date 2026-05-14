import {
  HiMenu,
  HiSearch,
  HiOutlineX,
  HiStar,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineClipboardList,
} from "react-icons/hi";

export type IconName =
  | "menu"
  | "search"
  | "close"
  | "star"
  | "clock"
  | "clipboard"
  | "calendar";

const Icon = ({
  iconName,
  className = "",
  size = 16,
}: {
  iconName: IconName;
  size?: number;
  className?: string;
}) => {
  switch (iconName) {
    case "menu":
      return <HiMenu className={className} size={size} />;
    case "search":
      return <HiSearch className={className} size={size} />;
    case "close":
      return <HiOutlineX className={className} size={size} />;
    case "star":
      return <HiStar className={className} size={size} />;
    case "clock":
      return <HiOutlineClock className={className} size={size} />;
    case "calendar":
      return <HiOutlineCalendar className={className} size={size} />;
    case "clipboard":
      return <HiOutlineClipboardList className={className} size={size} />;
    default:
      return null;
  }
};

export default Icon;
