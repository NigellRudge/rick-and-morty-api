import { Character } from "@/src/types/character";
import Image from "next/image";

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="group relative w-full transform-gpu will-change-transform rounded-xl hover:z-10 border hover:scale-[1.02] transition-all border-gray-700 shadow-xs overflow-hidden aspect-[4/5] hover:border-green-500 duration-200 ease-in-out">
      <div className="w-full h-full z-[1] overflow-hidden">
        <Image
          src={character.image}
          alt={character.image}
          fill
          className="object-cover w-full h-full transition-transform ease-in-out duration-200 group-hover:scale-[1.05]"
        />
      </div>
      <div className="absolute inset-0 opacity-0  group-hover:opacity-100 transition-all ease-in-out duration-200 bg-gray-500/50">
        <div className="flex flex-col">
          <span>{character.name}</span>
          <span>{character.species}</span>
          <span>{character.gender}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
