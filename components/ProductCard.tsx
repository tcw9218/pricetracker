import { Product } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type ProductCardProps = {
  product: Product

}
export const ProductCard = ( {product} : ProductCardProps ) => {
  return (
    <Link href={`/products/${product._id}`} className='product-card'>
      <div className='product-card_img-container'>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className='product-card-img'>

        </Image>
      </div>
      <div className='flex flex-col gap-3'>
        <h3 className='product-title'>{product.title}</h3>
        <div className='flex justify-center'>
          <p className='text-black font-semibold text-lg'>
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>  
        </div>
      </div>
    </Link>
  )
}
