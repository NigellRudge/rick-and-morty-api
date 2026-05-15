import Link from "next/link";
import Icon from "@/src/components/Icon";
import Image from "next/image";

const Footer = () => (
  <footer className="flex items-center justify-center w-full  border-t border-gray-600 py-4">
    <ul className="flex flex-col md:flex-row justify-between  w-[calc(min(100vw,1600px)-32px)] ">
      <li>
        <Link
          href="https://github.com/NigellRudge/rick-and-morty-api"
          className="flex flex-row text-gray-200 p-2 items-center justify-center gap-2 transition-colors duration-200 ease-in-out "
        >
          <Icon iconName="github" size={24} />
          <span className="text-sm">Github Page</span>
        </Link>
      </li>
      <li>
        <Link
          href="https://rickandmortyapi.com/"
          className="flex flex-row text-gray-200 p-2 items-center justify-center gap-2"
        >
          <Icon iconName="api" size={24} className="" />
          <span className="text-sm">Rick and Morty Api</span>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.themoviedb.org/"
          className="flex flex-row text-gray-200 p-2 items-center justify-center gap-2"
        >
          <Image
            src="/imgs/tmdb-logo.svg"
            alt="the movie database logo"
            width="70"
            height="40"
            sizes="100px"
            loading="eager"
            className="hidden md:block"
          />
          <span className="text-sm">The Movie Database</span>
        </Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
