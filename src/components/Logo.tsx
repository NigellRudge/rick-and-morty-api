import Image from "next/image";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`${className} items-center justify-center w-46 h-20 pt-4  relative`}
    >
      <div className="flex flex-1 relative h-full">
        <Image
          src="/imgs/logo.png"
          alt="rick-and-morty-logo"
          fill
          sizes="120px"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
