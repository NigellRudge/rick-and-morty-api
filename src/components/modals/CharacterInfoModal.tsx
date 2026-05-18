import { AnimatePresence, motion } from "framer-motion";
import useNavigationState from "@/hooks/useNavigationState";
import Icon from "@/shared/Icon";
import Image from "next/image";
import CharacterStatus from "@/shared/CharacterStatus";

const CharacterInfoModal = () => {
  const { selectedCharacter, setSelectedCharacter } = useNavigationState();

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
            className="fixed inset-0 m-auto md:max-w-[350px] max-w-[70vw] max-h-[600px] aspect-[4/6] z-50 rounded-xl border-gray-100 border overflow-hidden "
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
              <div className="w-full ease-in-out duration-200 z-[2] mt-auto p-3 min-h-1/5 bg-gray-700/80 border-gray-700">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex flex-col font-medium gap-0">
                    <span className="text-base md:text-lg  text-gray-50 font-semibold ">
                      {selectedCharacter!.name}
                    </span>
                    <span className="text-xs text-gray-200">
                      {selectedCharacter!.species} {selectedCharacter!.gender}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-200">
                      {selectedCharacter!.origin.name}
                    </span>

                    <div className="flex flex-col font-medium mt-4">
                      <span className="text-xs text-gray-400 capitalize">
                        Last Known Location
                      </span>
                      <span className="text-xs text-gray-200 ">
                        {selectedCharacter!.location.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <CharacterStatus status={selectedCharacter!.status} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CharacterInfoModal;
