import { Button } from "@/common/Button"



export const Playground: React.FC = () => {

  return (
    <main className='wrapper'>
      <div className='flex items-center gap-6'>
        <Button title='←'/>
        <Button title='Restart'/>
        <div className='text-white tracking-wider'>Moves:</div>
      </div>
      <div>

      </div>
    </main>
  )
}