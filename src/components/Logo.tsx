import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-full h-28 aspect-auto relative p-4`}
    >
      <div className="flex flex-1 relative h-full">
        <Image
          src="/imgs/logo.png"
          alt="rick-and-morty-logo"
          fill
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
