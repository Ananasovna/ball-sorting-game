import { Button } from "@/common/Button"
import { $moves, $tubes, restartClicked, toMainMenuClicked } from "@/store/store";
import { useList, useStore } from "effector-react"
import { Tube } from "./Tube"
import { WonScreen } from "./WonScreen";



export const Playground: React.FC = () => {
  const moves = useStore($moves);

  const isWon = false;
  const tubes = useList($tubes,
    ({ balls }, index) =>
      <div>
        <Tube tube={{ balls, over: null, complete: false }} position={index} />
      </div>
  )

  return (
    <main className='wrapper'>
      <div className='flex items-center gap-6'>
        <div onClick={toMainMenuClicked}>
          <Button title='←' />
        </div>
        <div onClick={restartClicked}>
          <Button title='Restart' />
        </div>
        <div className='text-white tracking-wider'>Moves: {moves}</div>
      </div>
      <div className='flex mt-12'>
        {tubes}
      </div>
      {isWon && <WonScreen />}

    </main>
  )
}