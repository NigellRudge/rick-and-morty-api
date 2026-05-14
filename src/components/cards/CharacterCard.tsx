import { Character } from "@/src/types/character";
import Image from "next/image";

const Status = ({
  status,
}: {
  status: "unknown" | "Alive" | "Dead" | string;
}) => {
  const backgroundColor =
    (status === "Alive" && "bg-green-500/80") ||
    (status === "unknown" && "bg-gray-700/80") ||
    (status === "Dead" && "bg-red-500/80");
  return (
    <div
      className={`absolute flex items-center justify-center left-2 top-2 py-0.5 px-3 z-[2] rounded-xl ${backgroundColor}`}
    >
      <span className="text-xs font-semibold text-white">{status}</span>
    </div>
  );
};

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="flex group relative w-full transform-gpu will-change-transform rounded-xl hover:z-10 border transition-all border-gray-700 shadow-xs overflow-hidden aspect-[4/6] hover:border-green-500 duration-200 ease-in-out">
      <div className="w-full overflow-hidden absolute inset-0 z-0">
        <Image
          src={character.image}
          alt={character.image}
          fill
          sizes="(min-width: 768px) 20vw,(min-width: 1025px) 15vw, 40vw"
          className="object-cover w-full h-full transition-transform ease-in-out duration-200 group-hover:scale-[1.05]"
        />
        <div className="absolute z-[1] inset-0  bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      <div className="w-full ease-in-out duration-200 z-[2] mt-auto p-2">
        <div className="flex flex-col gap-0">
          <h4 className="text-base md:text-lg text-gray-100 font-semibold">
            {character.name}
          </h4>
          <span className="text-sm font-medium text-gray-200">
            {character.species}
          </span>
          <span className="text-sm font-medium text-gray-200">
            {character.gender}
          </span>
        </div>
      </div>
      <Status status={character.status} />
    </div>
  );
};

export default CharacterCard;
