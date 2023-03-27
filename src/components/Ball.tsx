import { BallColor } from "@/types/types";
import classNames from "classnames";

interface BallProps {
  ball: BallColor,
  className?: string,
  children?: React.ReactNode,
}

export const Ball: React.FC<BallProps> = ({children, ball}) => {
  const classes = {
    0: 'bg-0',
    1: 'bg-1',
    2: 'bg-2',
    3: 'bg-3',
    4: 'bg-4',
    5: 'bg-5',
    6: 'bg-6',
    7: 'bg-7',
    8: 'bg-8',
    9: 'bg-9',
    10: 'bg-10',
    11: 'bg-11',
  }

  return (
    <div className={classNames(`${classes[ball]}`, 'h-8 w-8 rounded-full  border-black m-1 shrink-0 inner-shadow-ball')} data-number={ball}>
      {children}
    </div>
  )
};