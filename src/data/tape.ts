/**
 * The tape.
 *
 * The whole site is one home-video cassette: a title card, six reels, an
 * interval for the day job, and end credits. Everything the tape says lives
 * in this file — no component holds a sentence of its own.
 *
 * Each reel is now its own thing rather than six passes over one template.
 * They are toys: you touch the water, hold the throttle, pick the occasion,
 * roll the take, drag the temperature down, play a line. That means most of
 * the copy varies with what the visitor has done, so the alternatives live
 * here too — as threshold tables, read top-down, first match wins.
 *
 * Still worth reading back to her: reel 04's "posted · 10.7k" names her
 * follower count, and she has not been asked (see CONTENT.md). `approved` in
 * site.ts keeps the page out of search until she has seen all of it.
 */

import type { ImageMetadata } from 'astro';

import basketball from '../assets/photos/basketball.jpg';
import closeUp from '../assets/photos/close-up.jpg';
import hills from '../assets/photos/hills.jpg';
import holi from '../assets/photos/holi.jpg';
import inTheAir from '../assets/photos/in-the-air.jpg';
import inTheSea from '../assets/photos/in-the-sea.jpg';
import metro from '../assets/photos/metro.jpg';
import policeBox from '../assets/photos/police-box.jpg';
import portrait from '../assets/photos/portrait.jpg';
import redAndGold from '../assets/photos/red-and-gold.jpg';
import republicDay from '../assets/photos/republic-day.jpg';
import royalEnfield from '../assets/photos/royal-enfield.jpg';
import sareeStreet from '../assets/photos/saree-street.jpg';
import stoneTemple from '../assets/photos/stone-temple.jpg';

/*
 * palace.jpg is the one approved photograph this cut of the tape does not
 * use — it was a contact-sheet thumbnail on the old reel 01, and the reels
 * that replaced it have no thumbnail strip. The file is deliberately left in
 * src/assets/photos/: it was reviewed and approved, and dropping it is not a
 * decision that belongs in a redesign.
 */

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
   *   'poster' — punchy and saturated
   *   'tape'   — full VHS: scanlines, heavier colour bleed, and the
   *              head-switching noise band along the bottom edge.
   *
   * Note this no longer overrides each reel's photo treatment the way it used
   * to. The reels drive their own filters from what the visitor is doing — the
   * throttle saturates, the temperature dial drains the colour out — so a
   * uniform grade would fight them. It still controls the overlays.
   */
  grade: 'poster' as 'clean' | 'poster' | 'tape',

  /** Film grain over everything, 0–80. */
  grain: 80 as number,

  /**
   * The on-screen display: "reel 01 / 06", the running timecode, and the
   * progress bar on wide screens. Off by default — it was off in the design
   * too, which keeps the photographs uncluttered.
   *
   * The readouts that are part of an interaction — the odometer, the
   * thermometer, the take number, the splash counter — ignore this and are
   * always visible. They are how you can tell the toy is responding.
   */
  osd: false as boolean,
} as const;

/**
 * Copy that changes with what the visitor has done. Read top-down; the first
 * entry whose `min` the current value has reached wins, so these must stay
 * sorted highest-first.
 */
export interface Step {
  min: number;
  text: string;
}

export function stepFor(steps: Step[], value: number): string {
  for (const step of steps) if (value >= step.min) return step.text;
  return steps[steps.length - 1]?.text ?? '';
}

/* ----------------------------------------------------------- title card */

export const title = {
  kicker: 'home video · delhi',

  /** Three lines; the last is picked out in gold. */
  headingTop: 'No plot',
  headingMiddle: 'just good',
  headingAccent: 'footage',

  intro: 'Six reels. Salt water, hill roads, one motorcycle — and a short interval about the job.',

  /** Written on the cassette's paper label, in her hand. */
  labelName: 'geetanjali raghav',
  labelCode: 'E-180',
  scribble: "that's me",

  playLabel: 'press play',

  /**
   * Her Instagram profile picture at 320×320 — the lowest-resolution image on
   * the site. It sits in the cassette window at roughly 284px, so it holds,
   * but only just. A photograph at 1000px or more is the biggest single
   * upgrade available here and needs nothing but a file swap.
   */
  photo: portrait as ImageMetadata,
  alt: 'Geetanjali Raghav, straight to camera',
} as const;

/* ------------------------------------------------- 01 · salt water (tap) */

/**
 * Touch the photograph and it ripples. The splash count drives the grade, the
 * prompt, her aside and the paragraph — the more you poke at the water, the
 * further in she admits to being.
 */
export const salt = {
  num: '01',
  label: 'Salt water',
  tc: '00:03:18',
  accent: 'var(--tape-cyan)',
  edge: 'rgb(62 224 232 / 34%)',
  bg: 'radial-gradient(120% 90% at 70% 0%, #0d2230 0%, #0a1119 50%, #08040d 100%)',

  title: 'Salt water',
  readout: 'MAR 2024  16:04',
  photo: inTheSea as ImageMetadata,
  alt: 'Standing barefoot on rocks in the shallows, in a blue printed dress',
  pos: '50% 20%',

  /** Accessible name for the invisible button over the photograph. */
  action: 'Touch the water',

  /** Beyond ten splashes nothing more changes, so the tables stop there. */
  cap: 10,

  prompts: [
    { min: 10, text: 'told you' },
    { min: 1, text: 'again' },
    { min: 0, text: 'touch the water' },
  ] as Step[],

  hands: [
    { min: 10, text: 'not coming out, do not ask' },
    { min: 4, text: 'this is the good bit' },
    { min: 1, text: 'in up to my knees' },
    { min: 0, text: 'I said I was only paddling' },
  ] as Step[],

  lines: [
    {
      min: 4,
      text: 'Nobody has ever got me out of the water on the first ask. The dress was a write-off and I would do it again.',
    },
    {
      min: 0,
      text: 'Give me a coastline over a city break every time. I will start out saying I am only going to paddle.',
    },
  ] as Step[],
} as const;

/* ----------------------------------------------- 02 · two wheels (hold) */

/**
 * Hold the throttle and the revs climb: the frame shakes, the vignette closes
 * in, the colour saturates and the odometer runs on. Let go and it winds back
 * down. The kilometres are hers to keep — the counter never resets.
 */
export const wheels = {
  num: '02',
  label: 'Two wheels',
  tc: '00:09:12',
  accent: 'var(--tape-gold)',
  edge: 'rgb(255 197 61 / 34%)',
  bg: 'radial-gradient(120% 90% at 60% 0%, #2e1c0c 0%, #170d09 52%, #08040d 100%)',

  title: 'Two wheels',
  photo: royalEnfield as ImageMetadata,
  alt: 'Sitting astride a Royal Enfield in a cap and sunglasses, hands on the bars',
  pos: '50% 42%',

  throttleLabel: 'hold the throttle',
  /** Where the odometer starts. Shown with Indian digit grouping. */
  km: 12480,

  hands: [
    { min: 0.55, text: 'the engine is loud and so am I' },
    { min: 0.12, text: 'second gear, showing off' },
    { min: 0, text: 'parked, still posing' },
  ] as Step[],

  line: 'There is a photo of me on a Royal Enfield that I will never take down. It is not my bike. That has never once stopped me.',
} as const;

/* -------------------------------------------- 03 · any excuse (chips) */

export interface Occasion {
  name: string;
  stamp: string;
  photo: ImageMetadata;
  alt: string;
  pos: string;
  hand: string;
  line: string;
}

/**
 * Four reasons to get dressed up, one of them not a reason at all. Picking one
 * swaps the photograph, the date stamp, her aside and the paragraph.
 */
export const excuse = {
  num: '03',
  label: 'Any excuse',
  tc: '00:15:40',
  accent: 'var(--tape-pink)',
  edge: 'rgb(255 46 136 / 34%)',
  bg: 'radial-gradient(120% 90% at 40% 0%, #350f24 0%, #1b0715 52%, #08040d 100%)',

  title: 'Any excuse',

  /** Which occasion the reel opens on. Republic Day, as the design had it. */
  initial: 1,

  occasions: [
    {
      name: 'Diwali',
      stamp: 'OCT  DIWALI',
      photo: redAndGold,
      alt: 'In red and gold with stacked bangles along one arm',
      pos: '50% 26%',
      hand: 'the good earrings',
      line: 'Red and gold, and enough bangles that you can hear me coming down the corridor.',
    },
    {
      name: 'Republic Day',
      stamp: '26 JAN  REPUBLIC DAY',
      photo: republicDay,
      alt: 'In a yellow and black saree on a sunlit street',
      pos: '50% 32%',
      hand: 'yellow, obviously',
      line: 'A national holiday is a reason. So is a long weekend, and so is the light being nice at four o’clock.',
    },
    {
      name: 'Holi',
      stamp: 'MAR  HOLI',
      photo: holi,
      alt: 'Streaks of Holi colour through her hair and across one cheek',
      pos: '50% 26%',
      hand: 'colour in my hair for days',
      line: 'The one day of the year where ruining the outfit is the entire point.',
    },
    {
      name: 'a Tuesday',
      stamp: 'TUE  NO REASON',
      photo: sareeStreet,
      alt: 'In a saree, turning towards the camera on a street in low afternoon sun',
      pos: '50% 30%',
      hand: 'no occasion at all',
      line: 'No occasion. Nothing on. Wore the saree anyway and made somebody stop the car for a photo.',
    },
  ] as Occasion[],
} as const;

/* ---------------------------------------------- 04 · take four (roll) */

export interface Take {
  n: string;
  photo: ImageMetadata;
  alt: string;
  pos: string;
  /** Why this take was binned. The last one is the keeper. */
  why: string;
  hand: string;
}

/**
 * Four takes, three of them ruined. Roll through them and the frames stay
 * cold and crooked until the fourth, which straightens up, warms up, and gets
 * posted. The joke only works in order, so the button cycles rather than
 * letting you jump to the good one.
 */
export const takes = {
  num: '04',
  label: 'Take four',
  tc: '00:22:06',
  accent: 'var(--tape-pink)',
  edge: 'rgb(255 46 136 / 30%)',
  bg: 'radial-gradient(120% 90% at 55% 0%, #2a1030 0%, #150a1c 52%, #08040d 100%)',

  title: 'Take four',

  rollLabel: 'roll',
  againLabel: 'again',
  /** Shown on the keeper only. Names her follower count — see CONTENT.md. */
  postedLabel: 'posted · 10.7k',

  list: [
    {
      n: '01',
      photo: policeBox,
      alt: 'In a bright pink top beside an old blue police call box, hand on hip',
      pos: '50% 30%',
      why: 'somebody walked past',
      hand: 'take one, ruined',
    },
    {
      n: '02',
      photo: metro,
      alt: 'Holding the overhead strap on a moving metro train',
      pos: '50% 34%',
      why: 'train braked',
      hand: 'take two, wobbled',
    },
    {
      n: '03',
      photo: basketball,
      alt: 'In a t-shirt and shorts, holding a basketball under one arm',
      pos: '50% 26%',
      why: 'started laughing',
      hand: 'take three, useless',
    },
    {
      n: '04',
      photo: closeUp,
      alt: 'Smiling close up, head tilted, hair falling loose across the frame',
      pos: '50% 26%',
      why: 'kept it',
      hand: 'take four. that’ll do.',
    },
  ] as Take[],

  lines: {
    rolling: 'I make reels. Every one of them looks effortless because you never see the three before it.',
    kept: 'Fourteen seconds took forty minutes and three ruined takes. I posted it anyway and you all watched it.',
  },
} as const;

/* ----------------------------------------------- 05 · cold air (dial) */

/**
 * Drag the temperature down and the reel freezes over: colour drains, mist
 * comes up off the valley, snow starts, and rime creeps in from the edges.
 * The warm end is where most people would call it cold; the cold end is where
 * she actually wants to be.
 */
export const cold = {
  num: '05',
  label: 'Cold air',
  tc: '00:28:50',
  accent: 'var(--tape-ice)',
  edge: 'rgb(143 232 242 / 40%)',
  bg: 'radial-gradient(120% 90% at 30% 0%, #12283a 0%, #0b1420 52%, #08040d 100%)',

  title: 'Cold air',
  photo: hills as ImageMetadata,
  alt: 'Leaning on a railing with her back to the camera, looking out over forested hills',
  pos: '50% 50%',

  /** Degrees celsius. The dial runs warm on the left to cold on the right. */
  warm: 18,
  coldest: -4,
  initial: 14,

  dialLabel: 'drag me colder',
  unit: 'celsius',

  /** Thresholds here are on temperature, so they run warmest-first. */
  hands: [
    { min: 13, text: 'sleeves rolled up, still called it cold' },
    { min: 6, text: 'jacket weather, the good kind' },
    { min: 1, text: 'cannot feel my fingers, worth it' },
    { min: -99, text: 'best air I have ever breathed' },
  ] as Step[],

  lines: [
    {
      min: 6,
      text: 'Mountains any month, but December is the one. Old stone temples, cold air, tea that costs ten rupees and tastes like the best thing ever made.',
    },
    {
      min: -99,
      text: 'This is the part I go back for. Nobody about, breath in front of your face, hands too cold to hold the phone straight.',
    },
  ] as Step[],

  thumbs: [
    {
      src: inTheAir as ImageMetadata,
      alt: 'Suspended high above a forested valley, small against the mountainside',
    },
    {
      src: stoneTemple as ImageMetadata,
      alt: 'Seated on the steps of an old stone temple against a bright sky',
    },
  ],
} as const;

/* ------------------------------------------------ 06 · side a (play) */

export interface Track {
  n: string;
  /** Empty means a blank ruled line — see the note below. */
  line: string;
  note: string;
}

/**
 * The cassette inlay card, listing the captions that were only ever song
 * lyrics. Tapping a line plays it, which is to say a little VU meter twitches
 * next to it.
 *
 * The three blank rows are deliberate, not missing content: an inlay card has
 * more ruled lines than you ever fill in, and the empty ones are what make it
 * read as a real one. They render as rules, are not focusable, and are not
 * announced.
 */
export const sideA = {
  num: '06',
  label: 'Side A',
  tc: '00:34:20',
  accent: 'var(--tape-gold)',

  title: 'Side A',
  inlayTitle: 'captions that were just songs',
  inlayLength: '45 MIN',

  tracks: [
    { n: '01', line: 'Jab samne tum aa jate ho', note: 'caption, Feb 2021' },
    { n: '02', line: 'Tune wo kaam kar', note: 'caption, Aug 2022' },
    { n: '03', line: 'Main arse se khud se zara laapata hoon', note: 'caption, reel 04' },
    { n: '04', line: '', note: '' },
    { n: '05', line: '', note: '' },
    { n: '06', line: '', note: '' },
  ] as Track[],

  lines: {
    idle: 'Hindi film songs, mostly, on a loop until everyone in the car has learned the words. Tap a line — half my captions were just these.',
    playing:
      'That one. I could not improve on the line so I did not try — I just put it under the photo and posted it.',
  },
} as const;

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

/* ---------------------------------------------------------------- sound */

/**
 * A slow piano, synthesised in the browser rather than served as a file.
 *
 * This replaced a tape-hiss-and-transport-hum bed, which was accurate to a
 * cassette and unpleasant to sit under — a 50Hz drone is a drone.
 *
 * Nothing is committed and nothing is licensed, which is the point twice over.
 * The soundtrack this tape claims in its own credits is Hindi film music, which
 * is commercial and cannot go on a public page. And what plays instead is not a
 * transcription of anything: it is four chords arpeggiated with a bit of drift,
 * so there is no melody to have borrowed. Chord progressions are not
 * copyrightable; tunes are, so there deliberately isn't one.
 *
 * Silent until asked. See TapeChrome.astro for the control and the reasons.
 */
export const sound = {
  toggleLabel: 'Piano',
  onLabel: 'music on',
  offLabel: 'music off',

  /** Overall level. Deliberately low — this sits under a page, not on it. */
  gain: 0.1,

  /** Seconds between notes. Slow enough to feel like thinking, not playing. */
  step: 0.55,

  /**
   * MIDI note numbers, four to a chord, arpeggiated in order and looped:
   * Am7 · Fmaj7 · Cmaj7 · G6. Wistful, unresolved, and nobody's song.
   */
  progression: [
    [57, 60, 64, 67],
    [53, 57, 60, 64],
    [48, 52, 55, 59],
    [55, 59, 62, 64],
  ],

  /** How often a note gets doubled an octave up. Keeps the loop from settling. */
  sparkle: 0.22,

  /* --- tone: a struck string, faked with a decaying triangle ------------- */

  /** Seconds for a note to fall away. Long, so notes overlap and ring. */
  decay: 3.2,
  /** Cents of random detune per note, so no two are identical. */
  detune: 5,
  /** The brightness a note starts and ends at — real strings dull as they fade. */
  openHz: 4200,
  closeHz: 900,

  /* --- room: a feedback delay, which is cheaper than an impulse response - */

  reverbTime: 0.28,
  reverbFeedback: 0.34,
  reverbTone: 2200,
  reverbMix: 0.38,
} as const;

/* -------------------------------------------------------------- helpers */

/**
 * Screens in order: title, six reels, interval, credits. The transport
 * counter and the progress rail both need this count, and it must match the
 * number of sections index.astro actually renders.
 */
export const reelCount = 6;
export const screenCount = reelCount + 3;

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
