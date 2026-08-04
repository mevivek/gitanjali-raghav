/**
 * The tape.
 *
 * The whole site is one home-video cassette: a title card, six reels, an
 * interval for the day job, and end credits. Everything the tape says lives
 * in this file — no component holds a sentence of its own.
 *
 * The prose here is hers in voice, taken from the design rather than written
 * from her profiles like the old copy was. It is still worth reading back to
 * her: "10.7k of you" in reel 05 names her follower count, and she has not
 * been asked about that yet (see CONTENT.md). `approved` in site.ts keeps the
 * page out of search until she has seen all of it.
 */

import type { ImageMetadata } from 'astro';

import basketball from '../assets/photos/basketball.jpg';
import hills from '../assets/photos/hills.jpg';
import holi from '../assets/photos/holi.jpg';
import inTheAir from '../assets/photos/in-the-air.jpg';
import inTheSea from '../assets/photos/in-the-sea.jpg';
import laapata from '../assets/photos/laapata.jpg';
import metro from '../assets/photos/metro.jpg';
import palace from '../assets/photos/palace.jpg';
import policeBox from '../assets/photos/police-box.jpg';
import portrait from '../assets/photos/portrait.jpg';
import redAndGold from '../assets/photos/red-and-gold.jpg';
import republicDay from '../assets/photos/republic-day.jpg';
import royalEnfield from '../assets/photos/royal-enfield.jpg';
import sareeStreet from '../assets/photos/saree-street.jpg';
import stoneTemple from '../assets/photos/stone-temple.jpg';

/* ------------------------------------------------------------- the look */

/**
 * How worn the tape looks. These were adjustable knobs in the design tool;
 * the values below are the ones it shipped with, so the site looks like what
 * she was shown. Each is a one-word change.
 */
export const look = {
  /**
   * Photo treatment.
   *   'clean'  — barely graded, closest to the original photographs
   *   'poster' — punchy and saturated; a uniform grade across every reel
   *   'tape'   — full VHS: scanlines, heavier colour bleed, and the
   *              head-switching noise band along the bottom edge. This is
   *              also the only setting that uses each reel's own `filter`
   *              instead of one grade for all six.
   */
  grade: 'poster' as 'clean' | 'poster' | 'tape',

  /** Film grain over everything, 0–80. */
  grain: 80 as number,

  /**
   * The on-screen display: "reel 01 / 06", the running timecode, and the
   * date stamps burnt into each photograph. Off by default — it was off in
   * the design too, which keeps the photographs uncluttered. Turning it on
   * is the single biggest change to how the tape reads.
   */
  osd: false as boolean,
} as const;

/** Uniform grades. 'tape' is absent deliberately — it defers to each reel. */
export const grades: Record<string, string> = {
  clean: 'saturate(1.06) contrast(1.03)',
  poster: 'saturate(1.32) contrast(1.16) brightness(.97)',
};

/* ----------------------------------------------------------- title card */

export const title = {
  /** The little line above the cassette. */
  kicker: 'home video · delhi',

  /** Two lines; the second word of line two is picked out in gold. */
  headingTop: 'Not much',
  headingBottom: 'of a',
  headingAccent: 'CV',

  intro:
    'Eight reels of hills, salt water, one motorcycle and a very short interval about my job.',

  /** Written on the cassette's paper label, in her hand. */
  labelName: 'geetanjali raghav',
  labelCode: 'E-180',

  /** Scribbled in the corner of the label window. */
  scribble: "that's me",

  playLabel: 'press play',

  /**
   * `portrait.jpg` is her Instagram profile picture at 320×320. It is the
   * lowest-resolution image on the site and it sits in the cassette window
   * at roughly 284px, so it holds up — but only just. A photograph at
   * 1000px or more is the biggest single upgrade available here and needs
   * nothing but a file swap.
   */
  photo: portrait as ImageMetadata,
  alt: 'Geetanjali Raghav, straight to camera',
} as const;

/* ---------------------------------------------------------------- reels */

export interface Thumb {
  src: ImageMetadata;
  alt: string;
}

export interface Reel {
  /** Two-digit reel number, shown as "reel 03 / 06". */
  num: string;
  /** Used for the section's accessible name. */
  label: string;
  /** Fake running time, burnt in as an on-screen display. */
  tc: string;
  /** The reel's colour: headings, handwriting, the frame's inner edge. */
  accent: string;
  /** Inner glow on the photo frame — the accent at low alpha. */
  edge: string;
  /** Full-screen background behind the photograph. */
  bg: string;
  /** Freezing-mist overlay. Reel 02 only. */
  frost?: boolean;

  title: string;
  /** The handwritten line under the title. Her aside, not a description. */
  hand: string;
  /** Camcorder date stamp. Only visible when `look.osd` is true. */
  stamp: string;
  /** The paragraph below the photograph. */
  line: string;

  photo: ImageMetadata;
  alt: string;
  /** object-position, for photographs that need their subject off-centre. */
  pos: string;
  /** Per-reel grade. Used only when `look.grade` is 'tape'. */
  filter: string;
  /** Chromatic bleed across the frame, strongest at the edges. */
  wash: string;

  /** Two supporting photographs, contact-sheet style. Hidden when short. */
  thumbs: Thumb[];
}

export const reels: Reel[] = [
  {
    num: '01',
    label: 'Salt water',
    tc: '00:03:18',
    accent: 'var(--tape-cyan)',
    edge: 'rgb(62 224 232 / 34%)',
    bg: 'radial-gradient(120% 90% at 70% 0%, #0d2230 0%, #0a1119 50%, #08040d 100%)',
    title: 'Salt water',
    hand: 'salt in my hair for a week',
    stamp: 'MAR 2024  16:04',
    line: 'Give me a coastline over a city break every time. I will stand in the shallows until somebody makes me come out.',
    photo: inTheSea,
    alt: 'Standing barefoot on rocks in the shallows, in a blue printed dress',
    pos: '50% 20%',
    filter: 'saturate(1.35) contrast(1.08) brightness(.92) hue-rotate(-6deg)',
    wash: 'linear-gradient(90deg, rgb(62 224 232 / 20%), transparent 34%, transparent 66%, rgb(255 46 136 / 16%))',
    thumbs: [
      { src: palace, alt: 'Sitting in the courtyard of a white palace in a yellow jumper' },
      { src: basketball, alt: 'In a t-shirt and shorts, holding a basketball under one arm' },
    ],
  },
  {
    num: '02',
    label: 'Cold air',
    tc: '00:09:47',
    accent: 'var(--tape-ice)',
    edge: 'rgb(143 232 242 / 40%)',
    bg: 'radial-gradient(120% 90% at 30% 0%, #12283a 0%, #0b1420 52%, #08040d 100%)',
    frost: true,
    title: 'Cold air',
    hand: 'winter, always winter',
    stamp: 'DEC  ALT 2100m',
    line: 'Mountains and December. Old stone temples, hands too cold to hold the phone straight, tea that costs ten rupees and tastes like the best thing ever made.',
    photo: hills,
    alt: 'Leaning on a railing with her back to the camera, looking out over forested hills',
    pos: '50% 50%',
    filter: 'saturate(1.1) contrast(1.12) brightness(.9) hue-rotate(-12deg)',
    wash: 'linear-gradient(90deg, rgb(143 232 242 / 26%), transparent 38%, transparent 62%, rgb(143 232 242 / 14%))',
    thumbs: [
      {
        src: inTheAir,
        alt: 'Suspended high above a forested valley, small against the mountainside',
      },
      { src: stoneTemple, alt: 'Seated on the steps of an old stone temple against a bright sky' },
    ],
  },
  {
    num: '03',
    label: 'Two wheels',
    tc: '00:16:22',
    accent: 'var(--tape-gold)',
    edge: 'rgb(255 197 61 / 34%)',
    bg: 'radial-gradient(120% 90% at 60% 0%, #2e1c0c 0%, #170d09 52%, #08040d 100%)',
    title: 'Two wheels',
    hand: '#bullet',
    stamp: 'JAN 2020  ROLL 08',
    line: 'There is a photo of me on a Royal Enfield that I will never take down. The engine is loud and so am I.',
    photo: royalEnfield,
    alt: 'Sitting astride a Royal Enfield in a cap and sunglasses, hands on the bars',
    pos: '50% 42%',
    filter: 'saturate(1.45) contrast(1.1) brightness(.92) sepia(.14)',
    wash: 'linear-gradient(90deg, rgb(255 197 61 / 20%), transparent 34%, transparent 66%, rgb(255 46 136 / 20%))',
    thumbs: [
      {
        src: metro,
        alt: 'Black and white photograph, holding the overhead strap on a moving metro train',
      },
      { src: policeBox, alt: 'In a bright pink top beside an old blue police call box, hand on hip' },
    ],
  },
  {
    num: '04',
    label: 'Any excuse',
    tc: '00:23:05',
    accent: 'var(--tape-pink)',
    edge: 'rgb(255 46 136 / 34%)',
    bg: 'radial-gradient(120% 90% at 40% 0%, #350f24 0%, #1b0715 52%, #08040d 100%)',
    title: 'Any excuse',
    hand: 'the good earrings',
    stamp: '26 JAN  REPUBLIC DAY',
    line: 'Diwali, Republic Day, Holi, a Tuesday. If there is a reason to put on the good earrings I will find it, and I will make everyone wait while I do.',
    photo: republicDay,
    alt: 'In a yellow and black saree on a sunlit street',
    pos: '50% 32%',
    filter: 'saturate(1.5) contrast(1.06) brightness(.95)',
    wash: 'linear-gradient(90deg, rgb(255 46 136 / 24%), transparent 36%, transparent 64%, rgb(255 197 61 / 20%))',
    thumbs: [
      { src: redAndGold, alt: 'In red and gold with stacked bangles along one arm' },
      {
        src: sareeStreet,
        alt: 'In a saree, turning towards the camera on a street in low afternoon sun',
      },
    ],
  },
  {
    num: '05',
    label: 'Take four',
    tc: '00:30:12',
    accent: 'var(--tape-pink)',
    edge: 'rgb(255 46 136 / 30%)',
    bg: 'radial-gradient(120% 90% at 55% 0%, #2a1030 0%, #150a1c 52%, #08040d 100%)',
    title: 'Take four',
    // Names her follower count. Outstanding permission — see CONTENT.md.
    hand: '10.7k of you 😅',
    stamp: 'REEL  0:00 / 0:14',
    line: 'I make reels. Fourteen seconds takes forty minutes, the good take is always the one where somebody walks past, and I will still post it.',
    photo: laapata,
    alt: 'Smiling close up, head tilted, hair falling loose across the frame',
    pos: '50% 26%',
    filter: 'saturate(1.45) contrast(1.08) brightness(.95)',
    wash: 'linear-gradient(90deg, rgb(255 46 136 / 22%), transparent 34%, transparent 66%, rgb(62 224 232 / 20%))',
    thumbs: [
      { src: holi, alt: 'Streaks of Holi colour through her hair and across one cheek' },
      { src: policeBox, alt: 'In a bright pink top beside an old blue police call box' },
    ],
  },
  {
    num: '06',
    label: 'On repeat',
    tc: '00:36:40',
    accent: 'var(--tape-gold)',
    edge: 'rgb(255 197 61 / 30%)',
    bg: 'radial-gradient(120% 90% at 45% 0%, #2b1c33 0%, #150c1c 52%, #08040d 100%)',
    title: 'On repeat',
    hand: 'half my captions are lyrics',
    stamp: 'SIDE A  TRACK 3',
    line: 'Hindi film songs, mostly, on a loop until everyone in the car has learned the words. Half my captions are lines I could not improve on.',
    photo: holi,
    alt: 'Streaks of Holi colour through her hair and across one cheek',
    pos: '50% 30%',
    filter: 'saturate(1.5) contrast(1.05) brightness(.94)',
    wash: 'linear-gradient(90deg, rgb(255 197 61 / 20%), transparent 34%, transparent 66%, rgb(255 46 136 / 22%))',
    thumbs: [
      { src: metro, alt: 'Holding the overhead strap on a moving metro train' },
      { src: inTheSea, alt: 'Standing barefoot on rocks in the shallows' },
    ],
  },
];

/* ------------------------------------------------------------- interval */

/**
 * The day job, and the one screen that admits to being one. The jobs
 * themselves come from work.ts — this is only the framing around them.
 */
export const interval = {
  kicker: 'reel 07 · 00:41:02',
  heading: 'Interval',
  hand: 'the bit where I actually go to work',
  body: 'Quality checks, catching the thing everybody else missed, the report that has to be right before Friday. I am good at it and it pays for the train tickets. It is not the interesting part — that is why it is only an interval.',
  resumeLabel: 'resume tape',
  /** Badge on the current role. */
  nowBadge: 'on air',
} as const;

/* ---------------------------------------------------------- end credits */

export interface Credit {
  role: string;
  who: string;
}

export const credits: Credit[] = [
  { role: 'in front of the camera', who: 'Geetanjali Raghav' },
  { role: 'behind the camera', who: 'also her' },
  { role: 'location', who: 'Delhi → the hills → the sea' },
  { role: 'best season', who: 'winter' },
  { role: 'soundtrack', who: 'Hindi film songs' },
  { role: 'day job', who: 'see interval' },
];

export const ending = {
  kicker: 'end of tape',
  headingTop: 'Cast &',
  headingBottom: 'crew',
  signoff: 'shot on a phone, mostly in winter, mostly on the way somewhere',
  rewindLabel: 'rewind',
} as const;

/* -------------------------------------------------------------- helpers */

/**
 * Screens in order: title, six reels, interval, credits. The transport
 * counter and the progress rail both need this count, and it must match the
 * number of sections index.astro actually renders.
 */
export const screenCount = reels.length + 3;

/**
 * Fake tape position for a screen, as "0:MM:SS". Starts at eighteen seconds
 * and advances 6:32 a reel, which is what puts the interval at roughly the
 * forty-one minute mark printed on it.
 */
export function timecode(index: number): string {
  const total = 18 + index * 392;
  const mm = String(Math.floor(total / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  return `0:${mm}:${ss}`;
}
