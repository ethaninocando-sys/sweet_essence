export type Direction = 1 | 2 | 3 | 4;

export interface Benefit {
  title: string;
  desc: string;
}

/** Benefit with a leading "01".."04" index, used by the Bold direction. */
export interface NumberedBenefit extends Benefit {
  num: string;
}

export interface Product {
  name: string;
  variety: string;
  price: string;
  tag: string;
  /** Path under /public, e.g. "/assets/gen-wildflower.png". */
  img: string;
  /** object-position for the framed image. */
  pos: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface MarketEvent {
  day: string;
  month: string;
  name: string;
  place: string;
  time: string;
}
