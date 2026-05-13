import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-32 h-12 relative p-4`}
    >
      <Image
        src="/imgs/logo.png"
        alt="rick-and-morty-logo"
        fill
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Logo;
