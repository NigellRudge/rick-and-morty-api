import { ReactNode } from "react";
import Head from "next/head";
import { name } from "../../package.json";
import SideBar from "@/src/layout/SideBar";
import Header from "@/src/layout/Header";

const Layout = ({
  children,
  backgroundImage,
}: {
  children: ReactNode;
  backgroundImage?: string;
}) => {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex h-screen max-w-full overflow-hidden bg-gradient-to-r from-slate-800 to-green-900">
        <SideBar />
        <div className="flex flex-col overflow-hidden relative flex-1">
          <Header />
          <main className="flex flex-col overflow-y-scroll flex-1 relative px-6 py-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
