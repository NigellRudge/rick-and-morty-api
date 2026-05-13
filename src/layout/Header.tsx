import Icon from "@/src/components/Icon";
import useNavigationState from "@/src/hooks/useNavigationState";
import SearchBar from "@/src/layout/SearchBar";
import useIsHovering from "@/src/hooks/useIsHovering";

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

const Header = ({ hasScrolled }: { hasScrolled: boolean }) => {
  const { elementRef, isHovering } = useIsHovering();
  const isTransparent = !isHovering || hasScrolled;

  return (
    <div
      ref={elementRef}
      className={`absolute inset-0 flex h-16 z-[3] ${hasScrolled ? "bg-base-100" : "bg-transparent"} transition-opacity ease-in-out duration-300 ${isTransparent ? " opacity-70" : "opacity-100"}`}
    >
      <div className="flex flex-row flex-1 items-center gap-2 py-2 px-6">
        <MenuButton />
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
