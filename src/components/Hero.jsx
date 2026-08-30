import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchBanners } from '../api';

const HERO_SECTION_CLASS =
  'relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[min(85vh,720px)] bg-gray-100 overflow-hidden';

const imageUrl = (src) => {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return src;
  return `/${src.replace(/^\//, '')}`;
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedIndexes, setLoadedIndexes] = useState(() => new Set([0]));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBanners();
        const list = (data.banners || [])
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map((b) => b.image_url || '')
          .filter(Boolean);
        if (!cancelled) {
          setSlides(list);
          setCurrentSlide(0);
        }
      } catch {
        if (!cancelled) setSlides([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    setLoadedIndexes((prev) => {
      const next = new Set(prev);
      next.add(currentSlide);
      next.add((currentSlide + 1) % slides.length);
      next.add((currentSlide - 1 + slides.length) % slides.length);
      next.add(0);
      return next;
    });
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const first = slides[0];
    if (!first) return;
    const href = imageUrl(first);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, [slides]);

  if (loading) {
    return (
      <section className={HERO_SECTION_CLASS}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-biomed-teal animate-spin" />
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return <section className={HERO_SECTION_CLASS} aria-hidden="true" />;
  }

  return (
    <section className={HERO_SECTION_CLASS}>
      <div className="absolute inset-0">
        {slides.map((image, index) => {
          const isActive = index === currentSlide;
          const shouldLoad = loadedIndexes.has(index);
          return (
            <div
              key={`${image}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {shouldLoad && (
                <img
                  src={imageUrl(image)}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={1920}
                  height={800}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding="async"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              )}
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all ${
                  index === currentSlide
                    ? 'w-12 h-3 bg-biomed-teal'
                    : 'w-3 h-3 bg-white/60 hover:bg-white/90'
                } rounded-full shadow-lg`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
