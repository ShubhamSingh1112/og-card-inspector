"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className: string;
  imageClassName: string;
  unavailableClassName?: string;
  unavailableText?: string;
}

export function PreviewImage({
  src,
  alt,
  className,
  imageClassName,
  unavailableClassName = "preview-image-unavailable",
  unavailableText = "Image unavailable",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`preview-image ${className}`} aria-busy={!loaded && !failed}>
      {!loaded && !failed && <span className="preview-image-skeleton" aria-hidden="true" />}
      {src && !failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className={`${imageClassName}${loaded ? " is-loaded" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={unavailableClassName}>{unavailableText}</span>
      )}
    </div>
  );
}
