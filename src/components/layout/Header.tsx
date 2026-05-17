import Icon from "@/shared/Icon";
import useNavigationState from "@/hooks/useNavigationState";
import SearchBar from "@/layout/SearchBar";
import Logo from "@/shared/Logo";
import { NavigationLinkItem } from "@/providers/NavigationStateProvider";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuButton = () => {
  const { setIsSideNavOpen } = useNavigationState();
  return (
    <button
      className="lg:hidden flex cursor-pointer"
      onClick={() => setIsSideNavOpen(true)}
    >
      <Icon iconName="menu" size={32} className="text-gray-300" />
    </button>
  );
};

const NavigationLink = ({
  link,
  isActive,
  showNavigationOverContent = false,
}: {
  link: NavigationLinkItem;
  showNavigationOverContent?: boolean;
  isActive?: boolean;
}) => {
  const activeColor = showNavigationOverContent
    ? "bg-emerald-800/50"
    : "bg-emerald-800/90";
  return (
    <li>
      <Link
        href={link.url}
        className="group cursor-pointer focus:outline-primary "
      >
        <div
          className={`flex flex-row w-full transition-colors rounded-md ease-in-out duration-200 items-center px-4 py-2 ${isActive ? activeColor : "bg-transparent group-hover:bg-emerald-800/70"}`}
        >
          {Boolean(link.iconName) && <Icon iconName={link.iconName!} />}
          <span className="group-hover:text-white group-hover:font-bold transition-all ease-in-out duration-200">
            {link.label}
          </span>
        </div>
      </Link>
    </li>
  );
};

const MenuLinks = ({
  showNavigationOverContent = false,
}: {
  showNavigationOverContent?: boolean;
}) => {
  const router = useRouter();
  const { navigationLinks } = useNavigationState();
  return (
    <nav className="w-fit lg:block hidden ">
      <ul className="flex-row flex items-center gap-1">
        {navigationLinks.map((link) => (
          <NavigationLink
            showNavigationOverContent={showNavigationOverContent}
            isActive={router.asPath === link.url}
            key={link.label}
            link={link}
          />
        ))}
      </ul>
    </nav>
  );
};

const Header = ({
  showNavigationOverContent = false,
}: {
  showNavigationOverContent?: boolean;
}) => {
  return (
    <div
      className={` flex  w-full items-center justify-center ${showNavigationOverContent ? "absolute  inset-x-0  z-10" : "relative"}`}
    >
      <div
        className={` transition-opacity ease-in-out duration-300 h-[70px] flex items-center w-[calc(min(100vw,1600px)-32px)] `}
      >
        <div className="flex flex-row flex-1 gap-2 items-center justify-between">
          <div className="hidden lg:block">
            <Logo />
          </div>
          <SearchBar showNavigationOverContent={showNavigationOverContent} />
          <MenuLinks showNavigationOverContent={showNavigationOverContent} />
          <MenuButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
