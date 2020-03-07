import React, { Component } from 'react';
import ShopList from './components/ShopList';
import SearchHeader from './components/SearchHeader';


class SearchResult extends Component {
    render() {
        return (
            <div>
                <SearchHeader onBack={this.handleBack} onSearch={this.handleSearch}/>
                <ShopList/>
            </div>
        );
    }
}

export default SearchResult;