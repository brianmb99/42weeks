import { sitePath } from "../../lib/site-path";
import "./destination-gallery.css";

export type DestinationPhoto = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
};

export default function DestinationGallery({
  photos,
  label,
}: {
  photos: DestinationPhoto[];
  label: string;
}) {
  return (
    <section className="destination-gallery" aria-label={label}>
      {photos.map((photo, index) => (
        <figure className={index === 0 ? "is-featured" : undefined} key={photo.src}>
          <img
            src={sitePath(photo.src)}
            alt={photo.alt}
            fetchPriority={index === 0 ? "high" : undefined}
            loading={index === 0 ? "eager" : "lazy"}
          />
          <figcaption>
            <span>{photo.caption}</span>
            <a href={photo.source} rel="noreferrer" target="_blank">
              {photo.credit} ↗
            </a>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
