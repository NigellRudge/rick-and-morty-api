import Icon from "@/src/components/Icon";
import useNavigationState from "@/src/hooks/useNavigationState";
import SearchBar from "@/src/layout/SearchBar";
import useIsHovering from "@/src/hooks/useIsHovering";
import Headroom from "react-headroom";
import { useEffect } from "react";

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

const Header = ({
  hasScrolled,
  parentRef,
}: {
  hasScrolled: boolean;
  parentRef?: any;
}) => {
  const { elementRef, isHovering } = useIsHovering();

  return (
    <Headroom
      disable={!parentRef?.current}
      parent={() => parentRef.current}
      onPin={() => console.log("pinned")}
      onUnpin={() => console.log("unpinned")}
    >
      <div
        ref={elementRef}
        className={` transition-opacity ease-in-out duration-300`}
      >
        <div className="flex flex-row flex-1 items-center gap-2">
          <MenuButton />
          <SearchBar />
        </div>
      </div>
    </Headroom>
  );
};

export default Header;
