"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect } from "react";
import "@/styles/components/_carousel.scss";

export default function Carousel({
  images,
  autoplay = false,
  showPagination = false,
  fullScreenOnMobile = false,
  className = "",
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, slider] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      loop: true,
      created(sliderInstance) {
        setLoaded(true);
      },
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

  useEffect(() => {
    console.log("Carousel loaded:", loaded);
    console.log("Slider track details:", slider?.current?.track?.details);
  }, [loaded, slider]);

  if (!images || images.length === 0) return null;

  return (
    <section>
      <div
        ref={sliderRef}
        className={`keen-slider carousel ${
          fullScreenOnMobile ? "carousel--full-screen-mobile" : ""
        } ${className} ${loaded ? "" : "hidden"}`}
      >
        {images.map((img) => {
          const { url } = img.fields.file;
          return (
            <div key={img.sys.id} className="keen-slider__slide">
              <img
                src={`https:${url}`}
                alt={img.fields.title}
                className="carousel-image"
              />
            </div>
          );
        })}
      </div>

      {showPagination && slider?.current?.track?.details && (
        <div className="carousel-pagination">
          {images[currentSlide]?.fields?.description && (
            <div className="slide-description">
              {images[currentSlide].fields.description}
            </div>
          )}

          <div className="pagination-wrapper">
            <button
              className="arrow"
              onClick={() => slider.current.prev()}
              aria-label="Previous slide"
            >
              <img src="/assets/svg/chevron_left.svg" alt="Previous" />
            </button>
            <div className="dots">
              {[
                ...Array(slider.current.track.details.slides.length).keys(),
              ].map((idx) => (
                <button
                  key={idx}
                  onClick={() => slider.current?.moveToIdx(idx)}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                />
              ))}
            </div>
            <button
              className="arrow"
              onClick={() => slider.current.next()}
              aria-label="Next slide"
            >
              <img src="/assets/svg/chevron_right.svg" alt="Next" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
