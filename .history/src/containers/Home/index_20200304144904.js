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
 
export default Home;