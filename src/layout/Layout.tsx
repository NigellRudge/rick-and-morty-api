import { ReactNode } from "react";
import Head from "next/head";
import { name } from "../../package.json";
import SideBar from "@/src/layout/SideBar";
import Header from "@/src/layout/Header";
import useHasElementScrolled from "@/src/hooks/useHasElementScrolled";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import useNavigationState from "@/src/hooks/useNavigationState";
import Image from "next/image";
import Icon from "@/src/components/Icon";
import { Status } from "@/src/components/cards/shared";

const CharacterDetailModal = () => {
  const { selectedCharacter, setSelectedCharacter } = useNavigationState();
  return (
    <AnimatePresence>
      {Boolean(selectedCharacter) && (
        <>
          <motion.div
            onClick={() => setSelectedCharacter(null)}
            className="bg-gray-800/70 absolute inset-0 z-[10]"
          ></motion.div>
          <motion.div
            className="fixed inset-0 m-auto md:max-w-[400px] max-w-[70vw] aspect-[4/6] z-50 rounded-xl overflow-hidden"
            layoutId={`selected-${selectedCharacter!.id}`}
          >
            <button
              className="absolute top-1 right-1 z-30 p-4 cursor-pointer"
              onClick={() => setSelectedCharacter(null)}
            >
              <Icon iconName="close" size={24} className="text-white" />
            </button>
            <div className="flex relative w-full h-full rounded-xl  border-gray-700 shadow-xs overflow-hidden ">
              <div className="w-full overflow-hidden absolute inset-0 z-0">
                <Image
                  src={selectedCharacter!.image}
                  alt={selectedCharacter!.image}
                  fill
                  sizes="(min-width: 768px) 400px, 70vw"
                  className="object-cover w-full h-full"
                />
                <div className="absolute z-[1] inset-0  bg-gradient-to-t from-gray-900 via-gray-800/70 to-transparent" />
              </div>
              <div className="w-full z-[2] mt-auto p-3">
                <div className="flex flex-col gap-0">
                  <h4 className="text-base md:text-lg  text-gray-50 font-semibold">
                    {selectedCharacter!.name}
                  </h4>
                  <span className="text-xs font-medium text-gray-100">
                    {selectedCharacter!.species} {selectedCharacter!.gender}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {selectedCharacter!.origin.name}
                  </span>
                </div>
              </div>
              <Status status={selectedCharacter!.status} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

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
      <div className="flex h-screen max-w-full overflow-hidden no-scrollbar bg-gradient-to-r from-slate-800 to-green-900 ">
        <SideBar />

        <main
          ref={ref}
          className="flex flex-col overflow-y-scroll flex-1 relative px-6 py-4 no-scrollbar"
        >
          <Header parentRef={ref} hasScrolled={hasScrolled} />
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
