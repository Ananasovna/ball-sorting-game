import { Button } from "@/common/Button";
import { $moves, toMainMenuClicked } from "@/store/store";
import { useStore } from "effector-react";

export const WonScreen: React.FC = () => {
  const moves= useStore($moves);

  return (
    <div className='flex flex-col items-center gap-5 fixed inset-0 backdrop-blur-sm pt-20 bg-white/75'>
      <h1 className='text-3xl tracking-wider'>That's a win!</h1>
      <div className='text-xl'>
        In {moves} moves
      </div>
      <div onClick={toMainMenuClicked}>
        <Button title='New game'/>
      </div>
    </div>
  )
}