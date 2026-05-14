import { AnimatePresence, motion } from "framer-motion";
import useNavigationState from "@/src/hooks/useNavigationState";
import Icon from "@/src/components/Icon";
import { Status } from "@/src/components/cards/shared";
import Image from "next/image";
import { useEffect } from "react";

const CharacterDetailModal = () => {
  const { selectedCharacter, setSelectedCharacter } = useNavigationState();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCharacter(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <AnimatePresence>
      {Boolean(selectedCharacter) && (
        <>
          <motion.div
            onClick={() => setSelectedCharacter(null)}
            className="bg-gray-800/70 absolute inset-0 z-[10]"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          ></motion.div>
          <motion.div
            className="fixed inset-0 m-auto md:max-w-[450px] max-w-[70vw] aspect-[4/6] z-50 rounded-xl border-gray-100 border overflow-hidden "
            layoutId={`selected-${selectedCharacter!.id}`}
          >
            <button
              className="absolute top-1 right-1 z-30 p-4 cursor-pointer"
              onClick={() => setSelectedCharacter(null)}
            >
              <Icon iconName="close" size={24} className="text-white" />
            </button>
            <div className="flex flex-col relative w-full h-full rounded-xl  border-gray-400 shadow-xs overflow-hidden ">
              <div className="w-full overflow-hidden absolute inset-0 z-0">
                <Image
                  src={selectedCharacter!.image}
                  alt={selectedCharacter!.image}
                  fill
                  sizes="(min-width: 768px) 400px, 70vw"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full ease-in-out duration-200 z-[2] mt-auto p-3 h-1/5 bg-gray-700">
                <div className="flex flex-col gap-0 items-start">
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

export default CharacterDetailModal;
