import React, { Component } from 'react';

class ProductOverview extends Component {
    render() {
        return (
            <div className="productOverview">
                <div className="productOverview__header">
                    <div className="productOverview__imgContainer">
                        <img alt="" className="productOverview__img" src='https://p0.meituan.net/deal/e6864ed9ce87966af11d922d5ef7350532676.jpg@450w_280h_1e_1c_1l|watermark=1&&r=1&p=9&x=2&y=2&relative=1&o=20'/>
                    </div>
                </div>
                <div className="productOverview__purchase">

                </div>
                <ul className="productOverview__remarkItem">
                    <li></li>
                    <li></li>
                </ul>
            </div>
        );
    }
}

export default ProductOverview;