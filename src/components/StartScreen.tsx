import { Button } from "@/common/Button"
import { startClicked } from "@/store/store"


export const StartScreen: React.FC = () => {


  return (
    <main className='wrapper'>
      <div className='text-4xl text-white tracking-wider mb-10'>Balls sorting game</div>
      <div onClick={startClicked}>
        <Button title='Start the game' />
      </div>
    </main>
  )
}