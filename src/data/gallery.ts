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
 * each is re-encoded to WebP at 400/720/1080 and served with a srcset. The
 * files here are the untouched 1080px originals — never pre-shrink them.
 *
 * CAPTION CONVENTION: a short `label` naming what it was, plus a `date`.
 * They render on separate lines, so a narrow two-column phone layout breaks
 * them deliberately rather than wrapping one long string into three ragged
 * lines. `label` is omitted when there is nothing to name.
 *
 * Her Instagram captions are not reused verbatim. They were written for a
 * feed, where the reader has context and the post is ephemeral; set under a
 * photograph on a website they read as fragments — a bare hashtag, a
 * motivational line with no bearing on the picture, "Day 2" of a series whose
 * other days are not on this page. Where her own words genuinely name the
 * thing in frame ("Stone temple", "In the air", "Republic Day") they are kept
 * and a date appended. Otherwise the date stands alone rather than inventing
 * a description.
 *
 * Dates are exact, taken from each post's `takenAt`. Place names would be
 * better than a bare month — "Goa, March 2024" beats "The coast" — but they
 * are not known, and guessing at where a real person was is not acceptable.
 * Ask her, then fold them in.
 *
 * `alt` is a plain description for screen readers and is deliberately never
 * the same text as the caption.
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
import closeUp from '../assets/photos/close-up.jpg';

export interface Photo {
  src: ImageMetadata;
  /** Plain description, for people who cannot see the image. */
  alt: string;
  /** Short label naming what it was. Optional — omitted when there is
   *  nothing to name beyond the date. */
  label?: string;
  /** Month and year, from the post's `takenAt`. Always present. */
  date: string;
}

export const gallery: Photo[] = [
  {
    src: royalEnfield,
    alt: 'Sitting astride a Royal Enfield in a cap and sunglasses, hands on the bars',
    label: 'On the bullet',
    date: 'January 2020',
  },
  {
    src: inTheSea,
    alt: 'Standing barefoot on rocks in the shallows, in a blue printed dress',
    label: 'The coast',
    date: 'March 2024',
  },
  {
    src: metro,
    alt: 'Black and white photograph, holding the overhead strap on a moving metro train',
    label: 'On the metro',
    date: 'March 2021',
  },
  {
    src: policeBox,
    alt: 'In a bright pink top beside an old blue police call box, hand on hip',
    label: 'Calling Police',
    date: 'June 2023',
  },
  {
    src: basketball,
    alt: 'In a Levi’s t-shirt and shorts, holding a basketball under one arm',
    date: 'February 2021',
  },
  {
    src: hills,
    alt: 'Leaning on a railing with her back to the camera, looking out over forested hills',
    label: 'The hills',
    date: 'May 2023',
  },
  {
    src: holi,
    alt: 'Streaks of Holi colour through her hair and across one cheek',
    label: 'Holi',
    date: 'March 2024',
  },
  {
    src: palace,
    alt: 'Sitting in the courtyard of a white palace in a yellow jumper',
    label: 'The palace',
    date: 'March 2024',
  },
  {
    src: inTheAir,
    alt: 'Suspended high above a forested valley, small against the mountainside',
    label: 'In the air',
    date: 'June 2023',
  },
  {
    src: republicDay,
    alt: 'In a yellow and black saree on a sunlit street',
    label: 'Republic Day',
    date: 'January 2020',
  },
  {
    src: stoneTemple,
    alt: 'Seated on the steps of an old stone temple against a bright sky',
    label: 'Stone temple',
    date: 'June 2023',
  },
  {
    // Her caption was a Hindi lyric, "Main arse se khud se zara laapata
    // hoon". Dropped: romanised, "arse" reads as English profanity to anyone
    // who does not know the song, which on a public page under her own name
    // is not worth the risk for a line most visitors cannot parse anyway.
    src: closeUp,
    alt: 'Smiling close up, head tilted, hair falling loose across the frame',
    date: 'December 2023',
  },
  {
    // Same afternoon as the Republic Day photograph above, so the occasion is
    // not repeated here.
    src: sareeStreet,
    alt: 'In a saree, turning towards the camera on a street in low afternoon sun',
    date: 'January 2020',
  },
  {
    src: redAndGold,
    alt: 'In red and gold with stacked bangles along one arm',
    date: 'September 2023',
  },
];
