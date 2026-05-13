const SkeletonCard = ({
  type,
}: {
  type: "episode" | "character" | "location";
}) => {
  const aspectRatio =
    (type === "character" && "aspect-[4/6]") ||
    (type === "episode" && "aspect-video");
  return (
    <div className="w-full h-full">
      <div className={`skeleton h-full ${aspectRatio}`}></div>
    </div>
  );
};

export default SkeletonCard;
