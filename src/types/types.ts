export type Tube = {
  balls: BallColor[],
}

export type BallColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface tubeWillChangeArgs {
  tubes: Tube[],
  currentIndex: number,
  selectedIndex: number,
}