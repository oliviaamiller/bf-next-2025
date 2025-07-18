"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import "@/styles/components/_carousel.scss";

export default function Carousel({
  images,
  autoplay = false,
  showPagination = false,
  fullScreenOnMobile = false,
  className = "",
}) {
  const [loaded, setLoaded] = useState(false);

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    autoplay
      ? [
          (slider) => {
            let timeout;
            let mouseOver = false;

            function clearNextTimeout() {
              clearTimeout(timeout);
            }

            function nextTimeout() {
              clearTimeout(timeout);
              if (mouseOver) return;
              timeout = setTimeout(() => {
                slider.next();
              }, 4000);
            }

            slider.on("created", () => {
              setLoaded(true);
              slider.container.addEventListener("mouseover", () => {
                mouseOver = true;
                clearNextTimeout();
              });
              slider.container.addEventListener("mouseout", () => {
                mouseOver = false;
                nextTimeout();
              });
              nextTimeout();
            });

            slider.on("dragStarted", clearNextTimeout);
            slider.on("animationEnded", nextTimeout);
            slider.on("updated", nextTimeout);
          },
        ]
      : []
  );

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={sliderRef}
      className={`keen-slider carousel ${
        fullScreenOnMobile ? "carousel--full-screen-mobile" : ""
      } ${className} ${loaded ? "" : "hidden"}`}
    >
      {images.map((img) => {
        const { url, fileName } = img.fields.file;
        return (
          <div key={img.sys.id} className="keen-slider__slide">
            <img
              src={`https:${url}`}
              alt={img.fields.title || fileName}
              className="carousel-image"
            />
          </div>
        );
      })}

      {showPagination && (
        <div className="carousel-pagination">
          {/* add dots/buttons here if desired */}
        </div>
      )}
    </div>
  );
}
