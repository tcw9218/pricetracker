"use client"
import { scrapeAndStoreProduct } from '@/lib/actions'
import React, { FormEvent, useState } from 'react'

const isValidAmazonUrl = ( url:string ) => {
  try{
    const parsedUrl = new URL(url)
    const hostName = parsedUrl.hostname

    if( hostName.includes('amazon')){
      return true
    }
  }catch(e){
    return false
  }
  return false
}

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidAmazonUrl(searchPrompt)
    if(!isValidLink) return alert('Please input Valid amazon link')
    try{
      setIsLoading(true)
      //scrape
      const product = await scrapeAndStoreProduct(searchPrompt)
    }catch(e){

    }finally{
      setIsLoading(false)
    }
  }

  return (
    <form className='flex felx-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input 
            type="text"
            value={searchPrompt}
            onChange={(e)=>setSearchPrompt(e.target.value)}
            placeholder='Enter Product Link'
            className='searchbar-input'
        />
        <button 
          type="submit" 
          className='searchbar-btn'
          disabled={searchPrompt === ''}
        >
            {isLoading ? 'Searching' : 'Search'}
        </button>
    </form>
  )
}

export default SearchBar