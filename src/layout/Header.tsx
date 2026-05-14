import Icon from "@/src/components/Icon";
import useNavigationState from "@/src/hooks/useNavigationState";
import SearchBar from "@/src/layout/SearchBar";
import useIsHovering from "@/src/hooks/useIsHovering";
import Headroom from "react-headroom";
import Logo from "@/src/components/Logo";
import { NavigationLinkItem } from "@/src/providers/NavigationStateProvider";
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
          className={`flex flex-row w-full transition-colors ease-in-out duration-200 items-center px-4 py-2 ${isActive ? activeColor : "bg-transparent group-hover:bg-emerald-800/70"}`}
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
      <ul className="flex-row flex items-center">
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
  hasScrolled,
  parentRef,
  showNavigationOverContent = false,
}: {
  hasScrolled: boolean;
  parentRef?: any;
  showNavigationOverContent?: boolean;
}) => {
  const { elementRef, isHovering } = useIsHovering();

  return (
    <Headroom
      disable={!parentRef?.current || showNavigationOverContent}
      parent={() => parentRef.current}
      onPin={() => console.log("pinned")}
      onUnpin={() => console.log("unpinned")}
      className={
        showNavigationOverContent ? "absolute inset-3 z-10" : "relative"
      }
    >
      <div
        ref={elementRef}
        className={` transition-opacity ease-in-out duration-300 h-[70px] flex items-center px-8  `}
      >
        <div className="flex flex-row flex-1 gap-2 items-center justify-between">
          <Logo />
          <SearchBar showNavigationOverContent={showNavigationOverContent} />
          <MenuLinks showNavigationOverContent={showNavigationOverContent} />
          <MenuButton />
        </div>
      </div>
    </Headroom>
  );
};

export default Header;
