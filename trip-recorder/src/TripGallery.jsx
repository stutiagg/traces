import TripCard from './TripCard'
import './TripGallery.css'
import './AddTripCard'
import AddTripCard from './AddTripCard';
import { useEffect, useRef, useState } from 'react';

function TripGallery({trips, setTrips, setCreateMode, setEditingTrip}){
    const galleryRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState({
        isScrollable: false,
        thumbWidth: 100,
        thumbOffset: 0,
        value: 0,
    });

    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        let animationFrame = null;

        function updateScrollProgress() {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = requestAnimationFrame(() => {
                const maxScroll = gallery.scrollWidth - gallery.clientWidth;
                const isScrollable = maxScroll > 0;
                const viewportRatio = isScrollable
                    ? gallery.clientWidth / gallery.scrollWidth
                    : 1;
                const thumbWidth = Math.max(viewportRatio * 100, 14);
                const value = isScrollable
                    ? Math.min(Math.max(gallery.scrollLeft / maxScroll, 0), 1)
                    : 0;

                setScrollProgress({
                    isScrollable,
                    thumbWidth,
                    thumbOffset: value * (100 - thumbWidth),
                    value: Math.round(value * 100),
                });
                animationFrame = null;
            });
        }

        gallery.addEventListener('scroll', updateScrollProgress, { passive: true });

        const resizeObserver = new ResizeObserver(updateScrollProgress);
        resizeObserver.observe(gallery);
        window.addEventListener('resize', updateScrollProgress);
        updateScrollProgress();

        return () => {
            gallery.removeEventListener('scroll', updateScrollProgress);
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateScrollProgress);
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [trips.length]);

    return(
        <div>
            <h3 className='recent-trips' id="recent-trips-heading">Recent Trips</h3>
            <div className="carousel">
                <div
                    className="trip-gallery"
                    role="region"
                    aria-labelledby="recent-trips-heading"
                    tabIndex={0}
                    ref={galleryRef}
                >
                    {trips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            trip={trip}
                            trips={trips}
                            setTrips={setTrips}
                            setCreateMode={setCreateMode}
                            setEditingTrip={setEditingTrip}
                        />
                    ))}
                    {trips.length === 0 && <AddTripCard
                        empty={trips.length === 0}
                        setCreateMode={setCreateMode}
                    />}
                </div>
                {scrollProgress.isScrollable && (
                    <div className="trip-gallery-progress-track">
                        <div
                            className="trip-gallery-progress-thumb"
                            role="progressbar"
                            aria-label="Trip gallery scroll position"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={scrollProgress.value}
                            style={{
                                width: `${scrollProgress.thumbWidth}%`,
                                left: `${scrollProgress.thumbOffset}%`,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TripGallery