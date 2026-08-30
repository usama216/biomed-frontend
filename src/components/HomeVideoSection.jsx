import React, { useEffect, useRef, useState } from 'react';

const HomeVideoSection = () => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-6 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg min-h-[180px] md:min-h-[320px]">
          {shouldLoad ? (
            <video
              src="/assets/products/section-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto"
              style={{ pointerEvents: 'none' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full aspect-video bg-gray-100" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeVideoSection;
