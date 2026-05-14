import { ReactNode } from "react";
import Head from "next/head";
import { name } from "../../package.json";
import SideBar from "@/src/layout/SideBar";
import Header from "@/src/layout/Header";
import useHasElementScrolled from "@/src/hooks/useHasElementScrolled";
import { LayoutGroup } from "framer-motion";
import CharacterDetailModal from "@/src/layout/CharacterDetailModal";

const Layout = ({
  children,
  showNavigationOverContent = false,
}: {
  children: ReactNode;
  showNavigationOverContent?: boolean;
}) => {
  const { ref, hasScrolled } = useHasElementScrolled({ scrollOffset: 48 });
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex flex-col h-screen max-w-full overflow-hidden no-scrollbar bg-gradient-to-r from-slate-800 to-green-900 ">
        <Header
          showNavigationOverContent={showNavigationOverContent}
          parentRef={ref}
          hasScrolled={hasScrolled}
        />
        <SideBar />

        <main
          ref={ref}
          className={`
            flex flex-col overflow-y-scroll flex-1 relative ${showNavigationOverContent ? "lg:p-2 p-0" : "px-6 py-4 "} no-scrollbar
          `}
        >
          <LayoutGroup>
            {children}
            <CharacterDetailModal />
          </LayoutGroup>
        </main>
      </div>
    </>
  );
};

export default Layout;
