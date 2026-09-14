"use client";

import { type MouseEvent, useId, useRef } from "react";
import type { LocationRhythmHighlight } from "../../data/location-page-types";

type VibeActivityLinkProps = {
  activity: LocationRhythmHighlight;
};

export default function VibeActivityLink({
  activity,
}: VibeActivityLinkProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewId = useId();
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();

  function handleActivityClick(event: MouseEvent<HTMLAnchorElement>) {
    const dialog = dialogRef.current;
    const usesTouchDisclosure = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    if (!usesTouchDisclosure || !dialog?.showModal) {
      return;
    }

    event.preventDefault();
    dialog.showModal();
  }

  return (
    <div className="location-vibe-activity">
      <a
        href={activity.url}
        aria-describedby={previewId}
        onClick={handleActivityClick}
        rel="noreferrer"
        target="_blank"
      >
        {activity.title}
        <span aria-hidden="true"> ↗</span>
      </a>
      <div
        className="location-vibe-preview"
        id={previewId}
        role="tooltip"
      >
        <strong>{activity.title}</strong>
        <span>{activity.timing}</span>
        <p>{activity.description}</p>
      </div>
      <dialog
        aria-describedby={dialogDescriptionId}
        aria-labelledby={dialogTitleId}
        className="location-vibe-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
        ref={dialogRef}
      >
        <div>
          <button
            aria-label="Close activity preview"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            ×
          </button>
          <p>{activity.timing}</p>
          <h2 id={dialogTitleId}>{activity.title}</h2>
          <p id={dialogDescriptionId}>{activity.description}</p>
          <a href={activity.url} rel="noreferrer" target="_blank">
            Official information ↗
          </a>
        </div>
      </dialog>
    </div>
  );
}
