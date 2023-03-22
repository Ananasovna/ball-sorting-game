import { BALLS_IN_TUBE, COLORS_IN_GAME } from '@/constants/ballsColors';
import { BallColor, Tube, tubeWillChangeArgs } from "@/types/types";
import { combine, createEffect, createEvent, createStore, guard, sample } from "effector";
import { head, shuffle } from "lodash";

export const getCountOfTubes = (colors: number) => colors + 2;

export const $state = createStore<'start' | 'ingame' | 'won'>('start');
export const $moves = createStore<number>(0);

export const $tubes = createStore<Tube[]>([]);
export const $currentSelectedTubeIndex = createStore<number | null>(null);

export const $field = combine(
  $tubes,
  $currentSelectedTubeIndex,
  (tubes, selectedIndex) => {
    return tubes.map((tube, index) => {
      const isCurrent = selectedIndex === index;
      const over = isCurrent ? head(tube.balls)! : null;
      const leftBalls = isCurrent ? tube.balls.slice(1) : tube.balls;
      return {balls: leftBalls, over, complete: isComplete(tube)}
    })
  }
)

const $filledTubesCount = $field.map(
  (tubes ) => tubes.filter(({complete}) => complete).length);

function isComplete(tube: Tube): boolean {
  if (tube.balls.length === BALLS_IN_TUBE) {
    const firstBall = head(tube.balls)!;
    return tube.balls.every(ball => ball === firstBall);
  }
  return false;
}

export const startClicked = createEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>();
export const restartClicked = createEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>();
export const toMainMenuClicked = createEvent<React.MouseEvent<HTMLDivElement, MouseEvent>>();
export const tubeClicked = createEvent<React.MouseEvent<HTMLDivElement>>();

export const tubeSelected = tubeClicked.map(event => 
Number.parseInt(event.currentTarget.dataset.position ?? '', 10));
const gameFinishedSuccessfully = createEvent();

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
$moves.reset(generateTubesFX);

const tubeWillChange = sample ({
  clock: tubeSelected,
  source: [$tubes, $currentSelectedTubeIndex],
  fn: ([tubes, currentIndex], selectedIndex): tubeWillChangeArgs =>  ({
    tubes, currentIndex, selectedIndex
  } as tubeWillChangeArgs),
})

const ballUpLift = guard ({
  source: tubeWillChange,
  filter: ({tubes, currentIndex, selectedIndex}) => {
    return currentIndex === null && tubes[selectedIndex].balls.length != 0;
  }
})

$currentSelectedTubeIndex.on(ballUpLift, (_, {selectedIndex}) => selectedIndex);

const ballDownLiftBack = guard ({
  source: tubeWillChange,
  filter: ({currentIndex, selectedIndex}) => {
    return currentIndex === selectedIndex;
  }
})

$currentSelectedTubeIndex.on(ballDownLiftBack, (_, ) => null);

const ballMoved = guard ({
  source: tubeWillChange,
  filter: ({tubes, currentIndex, selectedIndex}) => {
    if (currentIndex === null) return false;
    if (currentIndex === selectedIndex) return false;
    if (tubes[selectedIndex].balls.length >= BALLS_IN_TUBE) return false;

    const sourceTube = tubes[currentIndex];
    const targetTube = tubes[selectedIndex];

    const sourceBall = head(sourceTube.balls);
    const targetBall = head(targetTube.balls);
    const isTargetTubeEmpty = targetBall == undefined;

    return isTargetTubeEmpty ? true : targetBall === sourceBall;
  }
})

$tubes.on(ballMoved, (_, {tubes, currentIndex, selectedIndex}) => {
  const sourceBall = head(tubes[currentIndex!].balls)!;

  return tubes.map((tube, index) => {
    if (index === currentIndex) return {balls: tube.balls.slice(1)};
    if (index === selectedIndex) return {balls: [sourceBall, ...tube.balls]};
    return tube;
  })
})

$currentSelectedTubeIndex.on(ballMoved, () => null);

guard( {
  source: $filledTubesCount,
  filter: (filled) => filled === COLORS_IN_GAME,
  target: gameFinishedSuccessfully,
})

$state.on(gameFinishedSuccessfully, () => 'won');

$currentSelectedTubeIndex.reset(restartClicked);
$currentSelectedTubeIndex.reset(toMainMenuClicked);

$moves.reset(restartClicked);

$moves.on(ballMoved, (count) => count + 1);



