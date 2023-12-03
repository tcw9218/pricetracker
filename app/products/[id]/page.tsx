import { getProductById } from '@/lib/actions'
import { redirect } from 'next/navigation'
import Image  from 'next/image'
import React from 'react'
import Link from 'next/link'

type DetailProps = {
  params: {id: string}
}
const ProductDetails = async ({params: { id }}: DetailProps) => {
  const product = await getProductById(id)

  if ( !product ) redirect('/')
  return (
    <div className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image
            src={product.image}
            alt={product.title}
            height={400}
            width={580}
            className='mx-auto'
            />
        </div>
        <div className='flex-1 flex felx-col'>
            <div className='flex  justify-between items-start gap-5 flex-wrap pb-6'>
              <div className='flex flex-col gap-3'>
                <p className='text-[28px] text-secondary'>{product.title}</p>
                <p>
                  <Link 
                    href={product.url}
                    target="_blank"
                    className='text-base text-black opacity-50'>

                    Visit Product
                    </Link>
                </p>
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails