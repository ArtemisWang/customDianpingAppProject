import React, { Component } from 'react';
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/LikeList'

class Home extends Component {
    render() { 
        return ( 
            <div>
                <Category/>
                <Headline/>
                <Discount/>
                <LikeList/>
            </div>
         );
    }
}
 
export default Home;