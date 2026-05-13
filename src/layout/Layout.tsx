import { ReactNode } from "react";
import Head from "next/head";
import { name } from "../../package.json";
import SideBar from "@/src/layout/SideBar";
import Header from "@/src/layout/Header";
import useHasElementScrolled from "@/src/hooks/useHasElementScrolled";

const Layout = ({
  children,
  backgroundImage,
}: {
  children: ReactNode;
  backgroundImage?: string;
}) => {
  const { ref, hasScrolled } = useHasElementScrolled({ scrollOffset: 48 });
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex h-screen max-w-full overflow-hidden bg-gradient-to-r from-slate-800 to-green-900 ">
        <SideBar />
        <div className="flex flex-col overflow-hidden relative flex-1 pt-8 ">
          <Header hasScrolled={hasScrolled} />
          <main
            ref={ref}
            className="flex flex-col overflow-y-scroll flex-1 relative px-6 py-4 no-scrollbar"
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
