import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/LikeList'
import HomeHeader from './components/HomeHeader/'
import Banner from './components/Banner/'
import Activity from './components/Activity/'
import Footer from '../../components/Footer/'
import { actions as homeActions, getLikes, getDiscounts, getPageCountOfLikes} from '../../redux/modules/home'

class Home extends Component {
    render() { 
        return ( 
            <div>
                <HomeHeader/>
                <Banner/>
                <Category/>
                <Headline/>
                <Activity/>
                <Discount/>
                <LikeList/>
                <Footer/>
            </div>
         );
    }
}

const mapStateToProps=(state,props)=>{
    return {
        likes:getLikes(state),
        discounts:getDiscounts(state),
        pageCount:getPageCountOfLikes(state)
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        homeActions:bindActionCreators(homeActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);