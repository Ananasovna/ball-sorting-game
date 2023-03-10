import { Button } from "@/common/Button"
import { $tubes, toMainMenuClicked } from "@/store/store";
import { useList } from "effector-react"
import { Tube } from "./Tube"
import { WonScreen } from "./WonScreen";



export const Playground: React.FC = () => {
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
        <Button title='Restart' />
        <div className='text-white tracking-wider'>Moves:</div>
      </div>
      <div className='flex mt-12'>
        {tubes}
      </div>
      {isWon && <WonScreen />}

    </main>
  )
}