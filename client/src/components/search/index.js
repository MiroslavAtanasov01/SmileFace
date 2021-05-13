import React, { useState } from 'react'
import SearchBox from './search-box'
import styles from './index.module.css'

const Search = () => {
    const [displaySearch, setDisplay] = useState(false)
    const [query, setQuery] = useState()

    return (
        <div>
            <div className={styles.container}>
                <input
                    className={styles.input}
                    autoComplete="off"
                    name="search"
                    onChange={(e) => {
                        setDisplay(true);
                        setQuery(e.target.value)
                    }}
                    type="text"
                    placeholder="Search"
                />
            </div>
            {displaySearch ? <SearchBox query={query} onMouseLeave={() => setDisplay(false)} /> : null}
        </div>
    )
};

export default Search;