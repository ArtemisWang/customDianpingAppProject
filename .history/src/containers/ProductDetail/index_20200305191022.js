import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview/'
import ShopInfo from './components/ShopInfo/';
import Detail from './components/Detail/'
import Remark from './components/Remark/'
import BuyButton from './components/BuyButton/'
import Header from '../../components/Header/'
import {actions as detailActions, getProduct} from '../../redux/modules/detail'

class ProductDetail extends Component {
    render() {
        return (
            <div>
                <Header title="团购详情" onBack={this.handleBack} grey/>
                <ProductOverview/>
                <ShopInfo/>
                <Detail/>
                <Remark/>
                <BuyButton/>
            </div>
        );
    }

    handleBack=()=>{
        
    }
}

export default ProductDetail;