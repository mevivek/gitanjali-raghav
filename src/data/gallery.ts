/**
 * The photo wall.
 *
 * Every image here was reviewed and approved individually. Four were turned
 * down specifically because someone other than her was recognisable in them —
 * her mother, her sister, her brother, a friend at Holi — since they have not
 * been asked and cannot consent by proxy. If any of those are wanted later,
 * ask the people in them first.
 *
 * Images live in src/assets/photos/ (not public/) so Astro optimises them:
 * each is re-encoded to WebP at three widths and served with a srcset.
 *
 * `caption` is her own Instagram caption wherever one exists — her voice
 * beats anything written for her. `alt` is a plain description for screen
 * readers and is deliberately never the same text, or a screen reader just
 * reads the emoji aloud.
 *
 * Order below is the order on the page. It is arranged for contrast rather
 * than chronology: the motorcycle opens, and no two photographs from the same
 * trip sit next to each other.
 */

import type { ImageMetadata } from 'astro';

import royalEnfield from '../assets/photos/royal-enfield.jpg';
import basketball from '../assets/photos/basketball.jpg';
import inTheSea from '../assets/photos/in-the-sea.jpg';
import metro from '../assets/photos/metro.jpg';
import holi from '../assets/photos/holi.jpg';
import hills from '../assets/photos/hills.jpg';
import policeBox from '../assets/photos/police-box.jpg';
import palace from '../assets/photos/palace.jpg';
import inTheAir from '../assets/photos/in-the-air.jpg';
import republicDay from '../assets/photos/republic-day.jpg';
import stoneTemple from '../assets/photos/stone-temple.jpg';
import redAndGold from '../assets/photos/red-and-gold.jpg';
import sareeStreet from '../assets/photos/saree-street.jpg';
import laapata from '../assets/photos/laapata.jpg';

export interface Photo {
  src: ImageMetadata;
  /** Plain description, for people who cannot see the image. */
  alt: string;
  /** Her caption. Shown under the photo. */
  caption?: string;
}

export const gallery: Photo[] = [
  {
    src: royalEnfield,
    alt: 'Sitting astride a Royal Enfield in a cap and sunglasses, hands on the bars',
    caption: '#bullet',
  },
  {
    src: inTheSea,
    alt: 'Standing barefoot on rocks in the shallows, in a blue printed dress',
    caption: 'Day 2️⃣ 🌊',
  },
  {
    src: metro,
    alt: 'Black and white photograph, holding the overhead strap on a moving metro train',
    caption: 'You gotta keep your head up ✌🏾',
  },
  {
    src: policeBox,
    alt: 'In a bright pink top beside an old blue police call box, hand on hip',
    caption: 'Calling Police 😁',
  },
  {
    src: basketball,
    alt: 'In a Levi’s t-shirt and shorts, holding a basketball under one arm',
    caption: 'Don’t change who you are to impress someone',
  },
  {
    src: hills,
    alt: 'Leaning on a railing with her back to the camera, looking out over forested hills',
    caption: '🏔️ ☮️',
  },
  {
    src: holi,
    alt: 'Streaks of Holi colour through her hair and across one cheek',
    caption: 'Playing with colour ♥️💚💖🌈',
  },
  {
    src: palace,
    alt: 'Sitting in the courtyard of a white palace in a yellow jumper',
    caption: 'Beauty that defies the passage of time 💫',
  },
  {
    src: inTheAir,
    alt: 'Suspended high above a forested valley, small against the mountainside',
    caption: 'In the air 🏔️',
  },
  {
    src: republicDay,
    alt: 'In a yellow and black saree on a sunlit street',
    caption: 'Republic Day 🎉',
  },
  {
    src: stoneTemple,
    alt: 'Seated on the steps of an old stone temple against a bright sky',
    caption: 'Stone temple 🙏🏻🌸',
  },
  {
    src: laapata,
    alt: 'Smiling close up, head tilted, hair falling loose across the frame',
    caption: 'Main arse se khud se zara laapata hoon',
  },
  {
    src: sareeStreet,
    alt: 'In a saree, turning towards the camera on a street in low afternoon sun',
  },
  {
    src: redAndGold,
    alt: 'In red and gold with stacked bangles along one arm',
  },
];
