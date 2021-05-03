import React, { useState } from 'react';
import Input from '../input';
import SearchBox from './search-box';

const Search = () => {
    const [displaySearch, setDisplay] = useState(false);
    const [query, setQuery] = useState();

    return (
        <div>
            <Input
                name="search"
                onChange={(e) => {
                    setDisplay(true);
                    setQuery(e.target.value);
                }}
                type="text"
                placeholder="Search" />
            {displaySearch ? <SearchBox query={query} onMouseLeave={() => setDisplay(false)} /> : null}
        </div>
    )
};

export default Search;