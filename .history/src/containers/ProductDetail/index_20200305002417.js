import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview/'
import ShopInfo from './components/ShopInfo/';
import Detail from './components/Detail/'

class ProductDetail extends Component {
    render() {
        return (
            <div>
                <ProductOverview/>
                <ShopInfo/>
                <Detail/>
            </div>
        );
    }
}

export default ProductDetail;