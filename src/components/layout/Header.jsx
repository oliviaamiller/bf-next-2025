import Image from "next/image";
import Link from "next/link";
import NavigationMenu from "../navigation/NavigationMenu";
import { getHomePage } from "@/lib/contentful";
import "@/styles/components/_header.scss";

export default async function Header() {
  const home = await getHomePage();
  const logo = home.logo.fields.file.url;

  return (
    <header>
      <div className="header-wrapper">
        <Link href="/" className="logo">
          <Image src={logo} alt="Logo" width={120} height={40} />
        </Link>
        <NavigationMenu />
      </div>
    </header>
  );
}
