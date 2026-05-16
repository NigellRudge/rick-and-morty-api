import { Character } from "@/src/types/character";
import Image from "next/image";

const CharacterThumbnail = ({ character }: { character: Character }) => {
  return (
    <div className="w-20 flex flex-col aspect-[4/6] group relative rounded-md hover:z-10 border transition-all border-gray-700 shadow-xs overflow-hidden ">
      <div className="w-full h-full absolute inset-0 z-0">
        <Image
          src={character.image}
          alt={character.image}
          fill
          sizes="100px"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bottom-0 inset-x-0">
        <span className="text-xs text-gray-100  font-medium">
          {character.name}
        </span>
      </div>
    </div>
  );
};

export default CharacterThumbnail;
