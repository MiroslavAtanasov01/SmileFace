import React, { useState } from 'react';
import Input2 from '../input2';
import SearchBox from './search-box';

const Search = () => {
    const [displaySearch, setDisplay] = useState(false);
    const [query, setQuery] = useState();

    return (
        <div>
            <Input2
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