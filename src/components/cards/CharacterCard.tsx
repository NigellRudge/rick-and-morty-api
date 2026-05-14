import { Character } from "@/src/types/character";
import Image from "next/image";
import { motion } from "framer-motion";
import useNavigationState from "@/src/hooks/useNavigationState";
import { Status } from "@/src/components/cards/shared";

const CharacterCard = ({ character }: { character: Character }) => {
  const { setSelectedCharacter, selectedCharacter } = useNavigationState();
  return (
    <motion.button
      tabIndex={0}
      layoutId={`selected-${character!.id}`}
      onClick={() => setSelectedCharacter(character)}
      animate={{ opacity: selectedCharacter?.id === character.id ? 0 : 1 }}
      className="flex group relative w-full transform-gpu will-change-transform rounded-xl hover:z-10 border transition-all border-gray-700 shadow-xs overflow-hidden aspect-[4/6] hover:border-green-500 duration-200 ease-in-out"
    >
      <div className="w-full overflow-hidden absolute inset-0 z-0">
        <Image
          src={character.image}
          alt={character.image}
          fill
          sizes="(min-width: 768px) 20vw,(min-width: 1025px) 15vw, 40vw"
          className="object-cover w-full h-full transition-transform ease-in-out duration-200 group-hover:scale-[1.05]"
        />
        <div className="absolute z-[1] inset-0  bg-gradient-to-t from-gray-900/90 via-gray-800/70 to-transparent" />
      </div>
      <div className="w-full ease-in-out duration-200 z-[2] mt-auto p-3">
        <div className="flex flex-col gap-0 items-start">
          <h4 className="text-base md:text-lg group-hover:text-gray-100 transition-colors ease-in-out duration-200 text-gray-400 font-semibold">
            {character.name}
          </h4>
          <span className="text-xs font-medium group-hover:text-gray-200 transition-colors ease-in-out duration-200 text-gray-400">
            {character.species} {character.gender}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {character.origin.name}
          </span>
        </div>
      </div>
      <Status status={character.status} />
    </motion.button>
  );
};

export default CharacterCard;
