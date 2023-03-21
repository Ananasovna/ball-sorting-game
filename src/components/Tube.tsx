import { BallColor } from "@/types/types"
import classNames from "classnames"
import { Ball } from "./Ball"

interface TubeProps {
  tube: {
    balls: Array<BallColor>,
    over: BallColor | null,
    complete: boolean,
  },
  position: number,
  onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>,
}

export const Tube: React.FC<TubeProps> = ({ tube, position, onClick }) => {
  return (
    <div data-position={position} className='flex flex-col p-4' onClick={onClick}>
      <div className='flex h-12 flex-col items-center justify-center border-b-4 border-b-white'>
        {tube.over !== null ? <Ball ball={tube.over} /> : null}
      </div>
      <div data-complete={tube.complete} 
      className={classNames(`${tube.complete ? 'bg-white' : null}`, 'h-40 w-12 flex flex-col justify-end shrink-0 items-center border-2 border-white rounded-b-3xl ')}>
        {tube.balls.map((color, index) => (
          <Ball key={index} ball={color} />
        ))}
      </div>
    </div>
  )
};