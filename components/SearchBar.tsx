"use client"
import React from 'react'

const SearchBar = () => {
    const handleSubmit = () => {

    }
  return (
    <form className='flex felx-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input 
            type="text"
            placeholder='Enter Product Link'
            className='searchbar-input'
        />
        <button type="submit" className='searchbar-btn'>
            Search
        </button>
    </form>
  )
}

export default SearchBar