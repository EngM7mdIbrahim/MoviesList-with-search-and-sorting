import React from 'react'

function Search({query, onQueryChange}) {

  return (
    <section className='layout-row justify-content-center mb-40'>
      <input 
        type='text'
        onChange={(e)=>{
          onQueryChange(e.target.value)
        }}
        value={query}
        placeholder='Search for movie by name' 
        className='w-75 py-2'
        data-testid='search'
      />
    </section>
  )
}

export default Search
