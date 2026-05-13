import { Character } from "@/src/types/character";
import Image from "next/image";

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="group relative w-full transform-gpu will-change-transform rounded-xl hover:z-10 border hover:scale-[1.02] transition-all border-gray-700 shadow-xs overflow-hidden aspect-[4/5] hover:border-green-500 duration-200 ease-in-out">
      <div className="w-full h-full z-[1]">
        <Image
          src={character.image}
          alt={character.image}
          fill
          className="object-cover w-full h-full transition-transform ease-in-out duration-200"
        />
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-12 translate-y-full  group-hover:translate-y-0 z-[2] transition-transform ease-in-out duration-200 bg-gray-500/50">
        <div className=""></div>
      </div>
    </div>
  );
};

export default CharacterCard;
