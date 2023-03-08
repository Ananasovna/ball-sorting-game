import { Button } from "@/common/Button"


export const StartScreen: React.FC = () => {


  return (
    <main className='wrapper'>
      <div className='text-3xl text-white tracking-wider mb-10'>Balls sorting game</div>
      <div>
        <Button title='Начать игру' />
      </div>
    </main>
  )
}