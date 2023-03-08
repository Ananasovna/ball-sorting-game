

interface ButtonProps {
  title: string,
}

export const Button = ({title}: ButtonProps) => {
  return (
    <button className='text-base p-4 shadow-xl hover:shadow-md bg-silver tracking-wider'>
      {title}
    </button>
  )
}