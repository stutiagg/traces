import { useState } from "react";
import { ImageOff } from "lucide-react";
import "./TripCover.css";

function getPaletteIndex(tripId) {
  const value = String(tripId ?? "");
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash % 5;
}

function TripCover({ src, alt, className = "", tripId, fallbackVariant }) {
  const imageUrl = typeof src === "string" ? src.trim() : "";
  const [failedUrl, setFailedUrl] = useState("");
  const hasFailed = !imageUrl || failedUrl === imageUrl;
  const paletteClass = fallbackVariant === "gallery"
    ? `trip-cover--palette-${getPaletteIndex(tripId)}`
    : "";

  return (
    <div className={`trip-cover ${paletteClass} ${className}`}>
      {hasFailed ? (
        fallbackVariant === "gallery"
          ? <div className="trip-cover-fallback trip-cover-fallback--gallery" aria-hidden="true" />
          : (
            <div className="trip-cover-fallback" role="img" aria-label={`${alt} unavailable`}>
              <ImageOff aria-hidden="true" />
              <span>Cover unavailable</span>
            </div>
          )
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          onError={() => setFailedUrl(imageUrl)}
        />
      )}
    </div>
  );
}

export default TripCover;
