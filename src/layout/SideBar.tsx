import useNavigationState from "@/src/hooks/useNavigationState";
import Link from "next/link";
import Icon from "@/src/components/Icon";
import { NavigationLinkItem } from "@/src/providers/NavigationStateProvider";
import Logo from "@/src/components/Logo";

const CloseMenuButton = () => {
  const { setIsSideNavOpen } = useNavigationState();
  return (
    <button
      onClick={() => setIsSideNavOpen(false)}
      className="md:hidden absolute right-2 top-2 z-[5] cursor-pointer"
      type="button"
    >
      <Icon iconName="close" size={24} className="" />
    </button>
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
  const { isSideNavOpen, setIsSideNavOpen, navigationLinks } =
    useNavigationState();

  return (
    <>
      <aside
        className={` bg-base-100 lg:bg-transparent h-[100vh]
      transition-all duration-200
      ease-in-out
         z-30 ${isSideNavOpen ? "translate-x-0" : "-translate-x-full"} absolute w-64 flex flex-col border-r border-gray-700`}
      >
        <div className="flex flex-row relative">
          <CloseMenuButton />
          <Logo />
        </div>

        <nav className="">
          <ul>
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <NavigationLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isSideNavOpen && (
        <div
          onClick={() => setIsSideNavOpen(false)}
          className="bg-gray-800/60 z-[10] lg:hidden absolute inset-0"
        ></div>
      )}
    </>
  );
};

export default SideBar;
