import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import PopularSearch from './components/PopularSearch';
import SearchHistory from './components/SearchHistory';
import {actions as searchActions, getRelatedKeywords, getPopularKeywords, getInputText, getHistoryKeywords } from '../../redux/modules/search'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Search extends Component {
    render() {
        const {inputText,relatedKeywords, popularKeywords,historyKeywords}=this.props
        return (
            <div>
                <SearchBox inputText={inputText} relatedKeywords={relatedKeywords} 
                onChange={this.handleChangeInput} onClear={this.handleClearInput} 
                onCancel={this.handleCancel} onClickItem={this.handleClickItem}/>
                <PopularSearch/>
                <SearchHistory/>
            </div>
        );
    }
}

const mapStateToProps=(state,props)=>{
    return {
        relatedKeywords: getRelatedKeywords(state),
        inputText: getInputText(state),
        popularKeywords: getPopularKeywords(state),
        historyKeywords: getHistoryKeywords(state)
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)