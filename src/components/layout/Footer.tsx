import Link from "next/link";
import Icon, { IconName } from "@/shared/Icon";
import Image from "next/image";

const footerLinks: {
  link: string;
  label: string;
  iconName?: IconName;
  imageSrc?: string;
}[] = [
  {
    label: "Github Page",
    iconName: "github",
    link: "https://github.com/NigellRudge/rick-and-morty-api",
  },
  {
    label: "Rick and Morty Api",
    iconName: "api",
    link: "https://rickandmortyapi.com/",
  },
  {
    label: "The Movie Database",
    imageSrc: "/imgs/tmdb-logo.svg",
    link: "https://www.themoviedb.org/",
  },
];

const FooterLink = ({
  link,
  label,
  iconName,
  imageSrc,
}: {
  link: string;
  label: string;
  iconName?: IconName;
  imageSrc?: string;
}) => (
  <li>
    <Link
      href={link}
      className="flex flex-row text-gray-200 p-2 items-center justify-center gap-2"
    >
      {iconName && <Icon iconName={iconName} size={24} />}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="the movie database logo"
          width="70"
          height="40"
          sizes="100px"
          loading="eager"
          className="hidden md:block"
        />
      )}
      <span className="text-sm">{label}</span>
    </Link>
  </li>
);

const Footer = () => (
  <footer className="flex items-center justify-center w-full  border-t border-gray-600 py-4">
    <ul className="flex flex-col md:flex-row justify-between  w-[calc(min(100vw,1600px)-32px)] ">
      {footerLinks.map((link) => (
        <FooterLink
          key={link.label}
          label={link.label}
          imageSrc={link.imageSrc}
          iconName={link.iconName}
          link={link.link}
        />
      ))}
    </ul>
  </footer>
);

export default Footer;
