/**
 * The photo wall.
 *
 * Images live in src/assets/photos/ (not public/) so Astro optimises them:
 * each one is re-encoded, resized to several widths and served with a srcset.
 * The originals are ~1080px Instagram exports; nothing is ever upscaled.
 *
 * `caption` is her own Instagram caption wherever one exists — her voice
 * beats anything written for her. `alt` is a plain description for screen
 * readers and is never the same text as the caption, which would just read
 * the emoji twice.
 *
 * To add a photo: drop the file in src/assets/photos/, import it, add an
 * entry. To remove one: delete its entry.
 */

import type { ImageMetadata } from 'astro';

import inTheSea from '../assets/photos/in-the-sea.jpg';
import waterfall from '../assets/photos/waterfall.jpg';
import palace from '../assets/photos/palace.jpg';
import archway from '../assets/photos/archway.jpg';
import desk from '../assets/photos/desk.jpg';
import road from '../assets/photos/road.jpg';
import festive from '../assets/photos/festive.jpg';
import quiet from '../assets/photos/quiet.jpg';

export interface Photo {
  src: ImageMetadata;
  /** Plain description, for people who cannot see the image. */
  alt: string;
  /** Her caption. Shown under the photo. */
  caption?: string;
}

export const gallery: Photo[] = [
  {
    src: inTheSea,
    alt: 'Standing barefoot on rocks in the shallows, in a blue printed dress',
    caption: 'Day 2️⃣ 🌊',
  },
  {
    src: desk,
    alt: 'Chin resting on her hand, grinning, in a bright pink top and glasses',
    caption: 'Tune wo kaam kar 🪔',
  },
  {
    src: palace,
    alt: 'Sitting in the courtyard of a white palace in a yellow jumper',
    caption: 'Beauty that defies the passage of time 💫',
  },
  {
    src: archway,
    alt: 'Silhouetted in a scalloped stone archway, looking out over a city',
    caption: 'Jab samne tum aa jate ho ♥️',
  },
  {
    src: waterfall,
    alt: 'A wide waterfall spilling down a green hillside, people watching from the rocks',
    caption: 'Day 3️⃣ 🌊',
  },
  {
    src: festive,
    alt: 'Dressed up in pink with statement earrings',
    caption: '💖💖✨',
  },
  {
    src: road,
    alt: 'In the passenger seat of a car, in a mustard jumper',
    caption: '🌠💫',
  },
  {
    src: quiet,
    alt: 'Wrapped in a cream shawl with her eyes closed',
  },
];
