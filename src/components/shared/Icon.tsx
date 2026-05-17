import {
  HiMenu,
  HiSearch,
  HiOutlineX,
  HiStar,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiPlay,
  HiPause,
  HiOutlineVolumeOff,
  HiOutlineVolumeUp,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa6";
import { AiTwotoneApi } from "react-icons/ai";
export type IconName =
  | "menu"
  | "search"
  | "close"
  | "star"
  | "clock"
  | "github"
  | "clipboard"
  | "api"
  | "play"
  | "pause"
  | "mute"
  | "unmute"
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
    case "github":
      return <FaGithub className={className} size={size} />;
    case "api":
      return <AiTwotoneApi className={className} size={size} />;
    case "play":
      return <HiPlay className={className} size={size} />;
    case "pause":
      return <HiPause className={className} size={size} />;
    case "mute":
      return <HiOutlineVolumeOff className={className} size={size} />;
    case "unmute":
      return <HiOutlineVolumeUp className={className} size={size} />;
    default:
      return null;
  }
};

export default Icon;
