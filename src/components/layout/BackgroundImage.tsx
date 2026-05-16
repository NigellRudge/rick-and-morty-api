import Image from "next/image";

const BackgroundImage = ({ src }: { src?: string }) => {
  if (!src) return null;

  return (
    <div className="absolute inset-0 z-0 backdrop-blur-md">
      <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-r from-slate-800/80 to-green-900/80 z-[2]"></div>
      <Image
        src={src}
        alt={src}
        fill
        className="w-full h-[40vh] object-cover z-0"
      />
    </div>
  );
};

export default BackgroundImage;
