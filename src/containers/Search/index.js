import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import PopularSearch from './components/PopularSearch';

class Search extends Component {
    render() {
        return (
            <div>
                <SearchBox/>
                <PopularSearch/>
            </div>
        );
    }
}

export default Search;