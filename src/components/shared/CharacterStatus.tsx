const CharacterStatus = ({
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

export default CharacterStatus;
