import React, { Component } from 'react';
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'

class Home extends Component {
    render() { 
        return ( 
            <div>
                <Category/>
                <Headline/>
                <Discount/>
            </div>
         );
    }
}
 
export default Home;