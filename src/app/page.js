import Carousel from "../components/content/Carousel";
import "@/styles/pages/_home.scss";
import { getHomePage } from "@/lib/contentful";

export default async function HomePage() {
  const home = await getHomePage();

  return (
    <div className="home-hero">
      <Carousel
        images={home.images}
        autoplay={true}
        fullScreenOnMobile={true}
      />
    </div>
  );
}
