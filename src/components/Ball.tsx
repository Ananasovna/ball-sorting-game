import { BallColor } from "@/types/balls";
import classNames from "classnames";

interface BallProps {
  ball: BallColor,
  className?: string,
  children?: React.ReactNode,
}

export const Ball: React.FC<BallProps> = ({className, children, ball}) => {
  const createClass = (ball: number): string => {
    return `bg-${ball}`
  }
  const classBall = createClass(ball);

  return (
    <div className={classNames(`${classBall}`, 'h-8 w-8 rounded-full border-2 border-black m-1 shrink-0')} data-number={ball}>
      {children}
    </div>
  )
};