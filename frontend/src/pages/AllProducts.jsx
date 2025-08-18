import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='text-lg font-bold'>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload product</button>
      </div>
      {
      openUploadProduct &&(

        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )
      }
    </div>
  )
}

export default AllProducts