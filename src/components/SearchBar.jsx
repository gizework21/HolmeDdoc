import React, { useState } from 'react'
import { ReactComponent as SearchBarIcon } from "../assets/images/home/SearchBarIcon.svg"

const SearchBar = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className="h-9 flex relative z-0">
            <input placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-[1px] h-full w-full rounded-md pl-3 placeholder:text-gray-800
        placeholder:text-size-4 outline-none"/>
            <button onClick={() => handleSearch(searchTerm)} className="bg-green h-full absolute right-0 rounded-md"><SearchBarIcon className="h-9 w-9 px-0 font-bold" /></button>
        </div>
    )
}

export default SearchBar