/**
 * The tape.
 *
 * The whole site is one home-video cassette: a title card, seven reels, an
 * interval for the day job, its b-side, and end credits. Everything the tape
 * says lives in this file — no component holds a sentence of its own.
 *
 * Each reel is its own thing rather than seven passes over one template. They
 * are toys: you touch the water, hold the throttle, pick the occasion, roll the
 * take, drag the temperature down, tap on the beat, play a line. That means
 * most of the copy varies with what the visitor has done, so the alternatives
 * live here too — as threshold tables, read top-down, first match wins.
 *
 * Still worth reading back to her: reel 04's "posted · 10.7k" names her
 * follower count, and she has not been asked (see CONTENT.md). `approved` in
 * site.ts keeps the page out of search until she has seen all of it.
 */

import type { ImageMetadata } from 'astro';

import basketball from '../assets/photos/basketball.jpg';
import hills from '../assets/photos/hills.jpg';
import holi from '../assets/photos/holi.jpg';
import inTheAir from '../assets/photos/in-the-air.jpg';
import inTheSea from '../assets/photos/in-the-sea.jpg';
import laapata from '../assets/photos/laapata.jpg';
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
 * How worn the tape looks. These were adjustable knobs in the design tool.
 *
 * Note these are *not* simply whatever the latest handoff shipped with. The
 * second handoff came with `grain: 46` and `osd: true`; both were reviewed and
 * turned down, so the tape keeps the heavier grain and the clean photographs it
 * already had. Each is still a one-word change if that is ever revisited.
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
   * throttle saturates, the temperature dial drains the colour out, the beat
   * warms the key light — so a uniform grade would fight them. It still
   * controls the overlays.
   */
  grade: 'poster' as 'clean' | 'poster' | 'tape',

  /** Film grain over everything, 0–80. */
  grain: 80 as number,

  /**
   * The on-screen display: "reel 01 / 07", the running timecode, and the
   * progress bar on wide screens. Off by default — it was off when the tape
   * was first built, and turning it on is the single biggest change to how the
   * site reads, so it stays a deliberate decision rather than a default.
   *
   * The readouts that are part of an interaction — the odometer, the
   * thermometer, the take number, the splash counter, the combo — ignore this
   * and are always visible. They are how you can tell the toy is responding.
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
  /** The strip above the cassette: gold on the left, mauve on the right. */
  kicker: 'home video',
  kickerRight: 'delhi · e-180',

  /**
   * Three lines, and the field names say which is which because they are not
   * interchangeable: the outer two are stencilled display type with a
   * mis-registered colour fringe, and the middle one is her handwriting, gold
   * and slightly crooked, wedged between them.
   */
  headingTop: 'No plot,',
  headingHand: 'just good',
  headingBottom: 'footage',

  intro:
    'Seven reels. Salt water, hill roads, one motorcycle, a song — and a short interval about the job.',

  /** Written on the cassette's paper label, in her hand. */
  labelName: 'geetanjali raghav',
  labelCode: 'E-180',
  /** The label's second line: what it said before, struck out, and the span. */
  labelWas: 'portfolio_final_v3',
  labelYears: '2019 — 2026',
  scribble: "that's me",

  playLabel: 'play',

  /**
   * Her Instagram profile picture at 320×320 — the lowest-resolution image on
   * the site, and now the only one used twice. It sits in the cassette window
   * at roughly 284px, where it holds, and fills the whole frame on reel 06,
   * where it does not really. A photograph at 1000px or more is the biggest
   * single upgrade available here and needs nothing but a file swap.
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
      photo: laapata,
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
  /**
   * Opens at the cold end, fully frozen — snow, rime, colour drained out. It
   * used to start at 14° so the dial had somewhere to go, but the coldest state
   * is the one worth arriving on: it is what the reel is about, and dragging
   * back up towards the warm end reads as a choice rather than a chore.
   */
  initial: -4,

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

/* ---------------------------------------------- 06 · playback (beat) */

/**
 * Her look, by how long the visitor has held the beat. Same idea as a `Step`
 * table — highest match wins — but it carries two strings rather than one.
 */
export interface Look {
  min: number;
  /** Printed beside the track name, in the frame. */
  look: string;
  hand: string;
}

export function lookFor(looks: Look[], value: number): Look {
  for (const entry of looks) if (value >= entry.min) return entry;
  return looks[looks.length - 1];
}

/**
 * Four dots keep time under the frame. Tap the photograph on the beat and the
 * combo climbs: bulbs light across the top like a dressing-room mirror, the
 * key light comes up, and her look steps from bare face to in character. Miss
 * and it all drops back to nothing.
 *
 * It is the one reel with a clock in it, so it only runs while it is the screen
 * in front — see the note in Playback.astro.
 */
export const playback = {
  num: '06',
  label: 'Playback',
  tc: '00:33:40',
  accent: 'var(--tape-pink)',
  edge: 'rgb(255 46 136 / 34%)',
  bg: 'radial-gradient(120% 90% at 50% 0%, #3a1026 0%, #1c0a17 52%, #08040d 100%)',

  title: 'Playback',
  /** The same 320×320 file as the title card — see the note on `title.photo`. */
  photo: portrait as ImageMetadata,
  /*
   * The design called this one "close up", which it is on the title card, where
   * the cassette window crops in tight. Full bleed in a portrait frame the same
   * square file shows all of her, so the alt text says what is actually there.
   */
  alt: 'Geetanjali Raghav in a black dress and pale blue jacket, straight to camera',
  pos: '50% 8%',

  /** Accessible name for the invisible button over the photograph. */
  action: 'Tap on the beat',

  /** Milliseconds to the beat, and how far either side of one still counts. */
  beat: 520,
  tolerance: 168,

  /** Bulbs across the top of the frame. The combo that lights the last one. */
  bulbs: 9,
  /** Beats to the bar — the dots on the control strip. */
  dots: 4,

  counterLabel: 'in time',

  prompts: {
    idle: 'tap on the beat',
    /** After a miss, while the combo is back at nothing. */
    missed: 'off beat — again',
    going: 'keep it',
    /** Every bulb lit. */
    full: 'do not stop',
  },

  looks: [
    { min: 9, look: 'in character', hand: 'and now I am the heroine' },
    { min: 6, look: 'the lip colour', hand: 'the good lipstick, obviously' },
    { min: 3, look: 'kajal on', hand: 'kajal first, always' },
    { min: 0, look: 'hair up, bare face', hand: 'phone against the mirror, take one' },
  ] as Look[],

  /**
   * Advances one on every hit, so the frame names a different song each time.
   * Titles only, and the same six as the inlay card on reel 07.
   */
  tracks: [
    'Nal Nachna',
    'Ishqa Ve',
    'Sawaal',
    'Mahiye',
    'Meri Bheegi Bheegi Si',
    'Dil Chura Le',
  ],

  lines: [
    {
      min: 9,
      text: 'Every word, every gesture, the little turn at the end of the line. Forty minutes of this to get fourteen seconds you would watch.',
    },
    {
      min: 0,
      text: 'Singing, dancing, a full face of makeup for a video that lasts fourteen seconds. I know every word of all of these and I will perform the lot of them at you, in the kitchen, on a Tuesday.',
    },
  ] as Step[],
} as const;

/* ------------------------------------------------ 07 · side a (play) */

export interface Track {
  n: string;
  line: string;
}

/**
 * The cassette inlay card: six songs, on a loop, at volume. Tapping a line
 * plays it, which is to say a little VU meter twitches next to it.
 *
 * Titles, not lyrics. The card used to print fragments of the words — they
 * were her captions, so they belonged to the site more than a title does — but
 * a lyric is somebody's copyright and a title is not, and this is a public
 * page under her name. The paragraph underneath still says the captions were
 * these songs; it just no longer quotes them.
 */
export const sideA = {
  num: '07',
  label: 'Side A',
  tc: '00:38:20',
  accent: 'var(--tape-gold)',

  title: 'Side A',
  inlayTitle: 'on repeat, at volume',
  inlayLength: '45 MIN',

  tracks: [
    { n: '01', line: 'Nal Nachna' },
    { n: '02', line: 'Ishqa Ve' },
    { n: '03', line: 'Sawaal' },
    { n: '04', line: 'Mahiye' },
    { n: '05', line: 'Meri Bheegi Bheegi Si' },
    { n: '06', line: 'Dil Chura Le' },
  ] as Track[],

  lines: {
    idle: 'Six songs, on a loop, at volume, until everybody in the car has learned them. Tap one — most of these have been a caption at some point.',
    playing: 'That one. Everybody in the car learns the words whether they meant to or not.',
  },
} as const;

/* ------------------------------------------------------------- interval */

/**
 * The day job, and the one screen that admits to being one. The jobs
 * themselves come from work.ts — this is only the framing around them.
 */
export const interval = {
  kicker: 'interval',
  tc: '00:41:02',
  /** Printed opposite the kicker. The quality-check card is screen 2. */
  screenTag: 'screen 1',
  heading: 'Interval',
  hand: 'the bit where I actually go to work',

  /**
   * A three-minute countdown, purely for the joke — nothing on the tape waits
   * on it and nothing happens when it reaches zero except the wording
   * changing. It only ticks while this screen is the one in front, so it does
   * not quietly run out while somebody is four reels away.
   */
  seconds: 180,
  clockLabel: 'interval ends in',
  clockOver: 'interval over',

  /** Column headings over the rows, like a cinema listing. */
  columnRole: 'showing',
  columnYears: 'times',

  /** The status chip at the right of each row. */
  nowBadge: 'now showing',
  endedBadge: 'ended',
  archiveBadge: 'archive',

  body: 'Quality checks, the report that has to be right before Friday. I am good at it and it pays for the train tickets — it is just not the interesting part.',

  resumeLabel: 'resume tape',
  /**
   * The b-side is optional, and this is what says so. It points at the
   * quality-check card while `resumeLabel` skips past it to the credits — if
   * both went to the same screen the word "or" would be a lie.
   */
  bsideHint: 'or read the b-side →',
} as const;

/* --------------------------------------------- interval · b-side (form) */

export interface Check {
  /** Form reference, printed in the left column. */
  id: string;
  item: string;
  verdict: 'pass' | 'fail';
  /** Her note in the margin, revealed with the stamp. */
  note: string;
}

/**
 * The interval's b-side: the quality-assurance form, turned on herself. Press
 * `check` on a line and the verdict lands as a rubber stamp with a note beside
 * it. Three pass, three fail, and it gets signed off regardless — which is the
 * joke, and also the point of putting it directly after the day job.
 *
 * The summary strings are templates rather than sentences because the numbers
 * in them are counted at runtime. `{n}`, `{done}`, `{total}`, `{pass}` and
 * `{fail}` are substituted; everything else is the wording.
 */
export const qualityCheck = {
  kicker: 'interval · b-side',
  tc: '00:44:30',

  /** Two lines of stencilled type at the head of the form. */
  heading: 'Quality',
  headingSecond: 'check',

  formCode: 'form gr/qa/26',
  formSubject: 'subject: self',
  signedYes: 'signed: yes',
  signedNo: 'signed: no',

  intro:
    'Catching what everybody else missed is the job. Turning it on myself is the hobby — tap a line.',

  runLabel: 'check',
  runAllLabel: 'run all',
  clearLabel: 'clear',

  summaryIdle: '{n} checks outstanding',
  summaryRun: '{done} of {total} run · {pass} pass · {fail} fail',

  signedLabel: 'signed',
  verdict: 'three fails, signed off anyway',
  /**
   * Dated the day the form was filled in, which is how a signed form works —
   * it is not meant to track today. One string if that is ever wrong.
   */
  date: '04.08.26',

  checks: [
    { id: 'QA-01', item: 'At the airport three hours early', verdict: 'pass', note: 'first at the gate' },
    {
      id: 'QA-02',
      item: 'A fourteen-second reel takes fourteen seconds',
      verdict: 'fail',
      note: 'forty minutes. as intended',
    },
    {
      id: 'QA-03',
      item: 'Leaves the water on the first ask',
      verdict: 'fail',
      note: 'reproducible every time',
    },
    { id: 'QA-04', item: 'Report is right before Friday', verdict: 'pass', note: 'every week, quietly' },
    { id: 'QA-05', item: 'The motorcycle belongs to her', verdict: 'fail', note: 'photo stays up' },
    { id: 'QA-06', item: 'Knows every word of the song', verdict: 'pass', note: 'all six, in order' },
  ] as Check[],
} as const;

/* ---------------------------------------------------------- end credits */

export interface Credit {
  role: string;
  who: string;
}

export const credits: Credit[] = [
  { role: 'in front of the camera', who: 'Geetanjali Raghav' },
  { role: 'behind the camera', who: 'also her' },
  { role: 'wardrobe', who: 'any excuse' },
  { role: 'location', who: 'Delhi → the hills → the sea' },
  { role: 'best season', who: 'winter' },
  { role: 'soundtrack', who: 'Hindi film songs' },
  { role: 'quality control', who: 'see interval' },
];

export const ending = {
  kicker: 'end of tape',
  /** Not printed anywhere; it is the last stop for the transport counter. */
  tc: '00:47:55',
  headingTop: 'Cast &',
  headingBottom: 'crew',
  signoff: 'shot on a phone, mostly in winter, mostly on the way somewhere',
  /** The last thing on the roll, after the sign-off. */
  theEnd: 'the end',

  rewindLabel: 'please rewind',
  rewindNote: 'be kind to the next viewer',

  /**
   * How long the credits sit still after you arrive before they start to roll,
   * in milliseconds.
   *
   * They used to begin on page load and run continuously, so by the time anyone
   * reached the last screen the roll was already halfway up and the first names
   * had gone past unseen. Now it waits until this screen is the one in front,
   * holds on the title for this long, and then moves — and it starts again from
   * the top on every return.
   */
  rollDelay: 2500,
} as const;

/* ------------------------------------------------------------- cold open */

/**
 * The second and a half of tracking noise before the title card — a tape
 * finding its picture. Skipped outright under reduced motion and when the URL
 * names a reel, and clickable away at any point.
 */
export const boot = {
  heading: 'tracking',
  detail: 'e-180 · side a · play',
  /** Milliseconds before it clears itself. */
  hold: 1500,
  dismissLabel: 'Skip the opening',
} as const;

/* ---------------------------------------------------------------- sound */

/**
 * Five short blips, synthesised in the browser rather than served as files.
 *
 * This replaced a slow synthesised piano, which in turn replaced a tape-hiss
 * bed. The piano was pleasant and entirely disconnected from anything the
 * visitor did; these are feedback — a transport clunk when the tape moves, a
 * key click on a control, a metronome tick and a ping on reel 06, and the
 * spooling sweep when you rewind. A cassette deck makes noise because you
 * pressed something.
 *
 * Nothing is committed and nothing is licensed, which matters here: the
 * soundtrack this tape claims in its own credits is Hindi film music, which is
 * commercial and cannot go on a public page. There is no melody in any of this
 * — there is nothing to have borrowed.
 *
 * Silent until asked, and every blip needs a gesture to fire, so a remembered
 * "on" can be restored outright without anything making noise on arrival. See
 * TapeChrome.astro for the control, and for how the reels reach it.
 */
export const sound = {
  toggleLabel: 'Sound',
  onLabel: 'sound on',
  offLabel: 'sound off',

  /** A single oscillator each. `toHz` glides; without it the pitch is fixed. */
  blips: {
    /** A key press: a chip, a track, a check, a missed beat. */
    click: { wave: 'square' as OscillatorType, hz: 1500, gain: 0.05, decay: 0.05 },
    /** Reel 06's metronome. Quieter than the rest — it repeats. */
    tick: { wave: 'triangle' as OscillatorType, hz: 2100, gain: 0.022, decay: 0.05 },
    /** A beat landed. Rises, so a hit and a miss are told apart by ear alone. */
    hit: {
      wave: 'triangle' as OscillatorType,
      hz: 900,
      toHz: 1500,
      glide: 0.07,
      gain: 0.05,
      decay: 0.11,
    },
  },

  /** The transport: a dull filtered noise burst over a falling thud. */
  clunk: {
    noiseDur: 0.15,
    /** Higher fades the burst away faster. */
    noiseCurve: 3,
    noiseCutoff: 560,
    noiseGain: 0.4,
    thudFrom: 128,
    thudTo: 44,
    thudGain: 0.26,
    thudDecay: 0.15,
  },

  /** Rewind: bandpassed noise swept up and back down, like spooling tape. */
  rewind: {
    dur: 0.9,
    q: 7,
    from: 700,
    peak: 2600,
    to: 520,
    /** Seconds in that the sweep tops out. */
    peakAt: 0.42,
    gain: 0.14,
  },
} as const;

/* -------------------------------------------------------------- helpers */

/**
 * Screens in order: the title card, seven reels, the interval, its b-side, the
 * credits. Eleven in all.
 *
 * These double as the URL fragment for each screen — `#playback` rather than
 * `#screen-6` — so a single reel can be linked to and arrived at directly. The
 * transport counter and the progress rail both need the count, and it must
 * match the number of sections index.astro actually renders.
 */
export const slugs = [
  'title',
  'salt-water',
  'two-wheels',
  'any-excuse',
  'take-four',
  'cold-air',
  'playback',
  'side-a',
  'interval',
  'quality-check',
  'end',
] as const;

export const reelCount = 7;
export const screenCount = reelCount + 4;

/**
 * Where the transport counter says the tape is, screen by screen.
 *
 * This used to be arithmetic — eighteen seconds, plus 6:32 a reel. That was
 * fine for nine screens and breaks at eleven: the last one came out as
 * "0:65:38", a counter reading sixty-five minutes past the hour. So it now
 * reads the timecode each screen already prints on itself, which has the
 * better property anyway — the counter and a reel's own readout cannot drift
 * apart, because there is only one of each number.
 *
 * The title card has no printed timecode of its own; eighteen seconds in is
 * where a tape's own leader ends.
 */
export const positions: readonly string[] = [
  '00:00:18',
  salt.tc,
  wheels.tc,
  excuse.tc,
  takes.tc,
  cold.tc,
  playback.tc,
  sideA.tc,
  interval.tc,
  qualityCheck.tc,
  ending.tc,
];

export function timecode(index: number): string {
  return positions[Math.max(0, Math.min(positions.length - 1, index))];
}
