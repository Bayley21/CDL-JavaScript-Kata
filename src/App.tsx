import { useState } from 'react'
import './App.css'
import { Item } from './types/item'

function App() {
  const [cart, setCart] = useState<Item[]>([])
  const items = ['A','B','C','D'];

  return (
      <div className="container mx-auto">
        <div className='grid grid-cols-4 space-x-6'>
          {items.map((v, i) => <div className='text-center rounded-lg border p-4'>
            {v}
          </div>)}
        </div>
        <hr className='my-16'/>
          <div className='flex justify-center gap-4 items-center'>
            <h3 className='text-lg font-bold'>Cart</h3>
          </div>
      </div>
  )
}

export default App
