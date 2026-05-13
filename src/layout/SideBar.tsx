import useNavigationState from "@/src/hooks/useNavigationState";
import Link from "next/link";
import Icon from "@/src/components/Icon";
import { NavigationLinkItem } from "@/src/providers/NavigationStateProvider";
import Logo from "@/src/components/Logo";

const CloseMenuButton = () => {
  const { setIsSideNavOpen } = useNavigationState();
  return (
    <div className="md:hidden block">
      <button
        onClick={() => setIsSideNavOpen(false)}
        className=""
        type="button"
      >
        <Icon iconName="close" size={24} className="" />
      </button>
    </div>
  );
};

const NavigationLink = ({ link }: { link: NavigationLinkItem }) => {
  return (
    <Link href={link.url} className="group">
      <div className="flex flex-row w-full h-12 items-center px-4">
        {Boolean(link.iconName) && <Icon iconName={link.iconName!} />}
        <span className="">{link.label}</span>
      </div>
    </Link>
  );
};

const SideBar = () => {
  const { isSideNavOpen, navigationLinks } = useNavigationState();

  return (
    <>
      <aside
        className={`transition-transform ease-in-out duration-300 z-30 lg:z-[1] lg:relative absolute flex flex-col lg:min-w-[300px] h-[100vh] border-r border-gray-700 lg:translate-x-0 ${isSideNavOpen ? "-translate-x-full" : "-translate-x-full"}`}
      >
        <div className="flex flex-row">
          <Logo />
        </div>
        <div className="">
          <nav className="">
            {navigationLinks.map((link) => (
              <NavigationLink key={link.label} link={link} />
            ))}
          </nav>
        </div>
      </aside>

      {isSideNavOpen && (
        <div className="bg-gray-800/60 z-20 md:hidden absolute inset-0"></div>
      )}
    </>
  );
};

export default SideBar;
