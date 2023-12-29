"use client";

// TODO: this is not really a molecule, but an atom.
// In figma it is a molecule because text is an atom there but this should be changed probably.

import React from "react";

export interface TileProps {
  category: string;
  title: string;
  paragrap_1: string;
  paragrap_2: string;
  paragrap_3: string;
}

export default function Tile({
  category,
  title,
  paragrap_1,
  paragrap_2,
  paragrap_3,
}: TileProps) {
  const paragraps = [paragrap_1, paragrap_2, paragrap_3];

  return (
    <article
      className="
      w-[500px] flex flex-col gap-md p-lg
      border-[1px] border-color-silenced rounded-rounded
    "
    >
      <h1 className="font-light text-sm">{category}</h1>
      <strong className="font-regular text-md">{title}</strong>
      {paragraps.map((paragraph, i) => (
        <p key={i} className="font-light text-md">
          {paragraph}
        </p>
      ))}
    </article>
  );
}
