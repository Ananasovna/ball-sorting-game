import { BallColor, Tube } from "@/types/balls";
import { createEffect, createEvent, createStore, sample } from "effector";
import { BALLS_IN_TUBE, COLORS_IN_GAME } from '@/constants/ballsColors';
import { shuffle } from "lodash";

export const getCountOfTubes = (colors: number) => colors + 2;

export const $state = createStore<'start' | 'ingame' | 'won'>('start');
export const $moves = createStore<number>(0);

export const $tubes = createStore<Tube[]>([]);

export const startClicked = createEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>();
export const restartClicked = createEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>();
export const toMainMenuClicked = createEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>();
export const tubeClicked = createEvent<React.MouseEvent<HTMLDivElement>>();

const generateTubesFX = createEffect<{colorsCount: number}, Tube[]>();

$state
.on(startClicked, () => 'ingame')
.on(toMainMenuClicked, () => 'start');

sample( {
  clock: [startClicked, restartClicked],
  fn: () => ({colorsCount: COLORS_IN_GAME}),
  target: generateTubesFX,
})

generateTubesFX.use(({colorsCount}) => {
  const tubesCount = getCountOfTubes(colorsCount);
  const avaliableballs = shuffle(Array.from(
    {length: BALLS_IN_TUBE * colorsCount},
    (_, index) => (index % BALLS_IN_TUBE) as BallColor)
    );


  const filledTubes = Array.from({length: colorsCount}).map(() =>
    ({balls: Array.from({length: BALLS_IN_TUBE})
    .map(() => avaliableballs.pop()!
    )
  }));

  const emptyTubes = Array.from({length: tubesCount - colorsCount}, () => ({balls: []}))

  return [...filledTubes, ...emptyTubes ];

})

$tubes.on(generateTubesFX.doneData, (_, tubes) => tubes);

$tubes.watch(console.log);


