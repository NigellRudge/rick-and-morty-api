import { ReactNode } from "react";
import Head from "next/head";
import { name } from "../../../package.json";
import SideBar from "@/src/components/layout/SideBar";
import Header from "@/src/components/layout/Header";
import { LayoutGroup } from "framer-motion";
import CharacterDetailModal from "@/src/components/modals/CharacterDetailModal";
import Footer from "@/src/components/layout/Footer";

const Layout = ({
  children,
  showNavigationOverContent = false,
}: {
  children: ReactNode;
  showNavigationOverContent?: boolean;
}) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1f2937" />
      </Head>
      <div className="flex flex-col h-screen max-w-full overflow-y-scroll no-scrollbar bg-gradient-to-r from-slate-800 to-green-900 ">
        <Header showNavigationOverContent={showNavigationOverContent} />
        <SideBar />

        <main
          className={`
            items-center flex flex-col flex-1 relative ${showNavigationOverContent ? "lg:p-2 p-0" : "px-6 py-4 "} no-scrollbar
          `}
        >
          <LayoutGroup>
            {children}
            <CharacterDetailModal />
          </LayoutGroup>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
