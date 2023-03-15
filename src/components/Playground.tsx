import { Button } from "@/common/Button"
import { $field, $moves, $tubes, restartClicked, toMainMenuClicked, tubeClicked, tubeSelected } from "@/store/store";
import { useList, useStore } from "effector-react"
import { Tube } from "./Tube"
import { WonScreen } from "./WonScreen";



export const Playground: React.FC = () => {
  const moves = useStore($moves);

  const isWon = false;
  const tubes = useList($field, 
    ({ balls, over}, index) =>
      <div>
        <Tube tube={{ balls, over, complete: false }} position={index} onClick={tubeClicked}/>
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