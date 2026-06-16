"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TESTIMONIAL_VIDEOS } from "@/lib/content";

type Item = (typeof TESTIMONIAL_VIDEOS)[number];

/** Um vídeo dentro do frame 4:5. Sem controles nativos: play customizado no centro
 *  que some ao tocar. Enquanto toca, um botão de pausa acessível (invisível, aparece
 *  no hover/foco) cobre o card. `onActivate` avisa o pai p/ pausar os outros vídeos. */
function VideoSlide({
  item,
  index,
  onActivate,
}: {
  item: Item;
  index: number;
  onActivate: (video: HTMLVideoElement) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    if (v.ended) v.currentTime = 0;
    v.play().catch(() => {
      // política de autoplay / abort: o estado segue onPlay/onPause; overlay permanece
    });
  };

  const togglePause = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) play();
    else v.pause();
  };

  const label = item.name
    ? `depoimento de ${item.name}`
    : `depoimento ${index + 1}`;

  return (
    <figure className="group relative m-0 aspect-[4/5] overflow-hidden rounded-2xl bg-void ring-1 ring-white/10">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        style={{ objectPosition: `${item.posX} center` }}
        src={item.src}
        poster={item.poster}
        playsInline
        preload="none"
        aria-label={`Vídeo de ${label}`}
        onPlay={() => {
          setPlaying(true);
          setLoading(false);
          if (ref.current) onActivate(ref.current);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onError={() => {
          setPlaying(false);
          setLoading(false);
        }}
      />

      {/* Fade inferior + nome do cliente / empresa */}
      {(item.name || item.company) && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/35 to-transparent px-4 pb-4 pt-14 leading-tight">
          {item.name && (
            <span className="block font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
              {item.name}
            </span>
          )}
          {item.company && (
            <span className="block text-xs text-ink-soft sm:text-base">
              {item.company}
            </span>
          )}
        </figcaption>
      )}

      {/* Spinner de buffering */}
      {playing && loading && (
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <span
            className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden="true"
          />
        </div>
      )}

      {playing ? (
        /* Pausa acessível: invisível, aparece sutil no hover/foco */
        <button
          type="button"
          onClick={togglePause}
          aria-label={`Pausar ${label}`}
          className="group/btn absolute inset-0 z-20 grid place-items-center"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-black/40 opacity-0 ring-1 ring-white/20 backdrop-blur-sm transition duration-200 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100">
            <Pause className="h-6 w-6 fill-white text-white" aria-hidden="true" />
          </span>
        </button>
      ) : (
        /* Play customizado azul */
        <button
          type="button"
          onClick={play}
          aria-label={`Reproduzir ${label}`}
          className="absolute inset-0 z-20 grid place-items-center"
        >
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-linear-to-b from-brand-hi to-brand shadow-[0_10px_34px_-6px_rgba(0,64,255,0.7)] ring-1 ring-white/25 transition duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
            <span
              className="absolute -inset-2 -z-10 rounded-full bg-brand/40 blur-xl"
              aria-hidden="true"
            />
            <Play
              className="ml-0.5 h-6 w-6 fill-white text-white sm:h-7 sm:w-7"
              aria-hidden="true"
            />
          </span>
        </button>
      )}
    </figure>
  );
}

export function TestimonialCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const activeRef = useRef<HTMLVideoElement | null>(null);

  // Garante um único vídeo tocando por vez (evita áudios sobrepostos).
  const handleActivate = (video: HTMLVideoElement) => {
    if (activeRef.current && activeRef.current !== video) {
      activeRef.current.pause();
    }
    activeRef.current = video;
  };

  // Desktop (≥1024): alinha o 1º card à esquerda do conteúdo (max-w-7xl + px-8) e
  // sangra até a borda direita; ao rolar, sangra também à esquerda. Mobile/tablet: 0.
  const applyOffset = (s: SwiperType) => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    const offset = w >= 1024 ? Math.max(32, (w - 1280) / 2 + 32) : 0;
    if (s.params.slidesOffsetBefore !== offset) {
      s.params.slidesOffsetBefore = offset;
      s.update();
    }
  };

  const navBtn =
    "depo-nav absolute top-[calc(50%-1.5rem)] z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-glass/70 text-ink backdrop-blur-md transition hover:bg-glass sm:grid";

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Depoimentos em vídeo"
    >
      <Swiper
        modules={[Navigation, Pagination, A11y, Keyboard]}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          const nav = swiper.params.navigation;
          if (nav && typeof nav !== "boolean") {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        onAfterInit={applyOffset}
        onResize={applyOffset}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        slidesPerView={1.4}
        spaceBetween={12}
        centeredSlides
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 16, centeredSlides: true },
          1024: { slidesPerView: 3.5, spaceBetween: 24, centeredSlides: false },
        }}
        className="depo-swiper !pb-12"
        style={
          {
            "--swiper-theme-color": "var(--color-brand-hi)",
          } as React.CSSProperties
        }
      >
        {TESTIMONIAL_VIDEOS.map((v, i) => (
          <SwiperSlide key={i} className="h-auto">
            <VideoSlide item={v} index={i} onActivate={handleActivate} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        type="button"
        aria-label="Depoimento anterior"
        className={`${navBtn} left-3 lg:left-6`}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label="Próximo depoimento"
        className={`${navBtn} right-3 lg:right-6`}
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
