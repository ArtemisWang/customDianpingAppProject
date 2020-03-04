import React, { Component } from 'react';
import "./style.css"

class ShopInfo extends Component {
  render() {
    return (
      <div className="shopInfo">
        <div className="shopInfo__header">
          使用商户（4）
          <span className="shopInfo__arrow"></span>
        </div>
        <div className="shopInfo__middle">
          <div className="shopInfo__middleLeft">
            <div className="shopInfo__shopName">
            院落创意菜
            </div>
            <div className="shopInfo__starsWrapper">
              <span className="shopInfo__stars">
              <i className="shopInfo__stars--red" style={{"width": "100%"}}></i>
              </span>
              <span className="shopInfo__distance">>100km</span>
            </div>
          </div>
          <div className="shopInfo__middleRight">
            <i className="shopInfo__phoneIcon"></i>
          </div>
        </div>
        <div className="shopInfo__bottom">
          <i className="shopInfo__locationIcon"></i>北京朝阳区
        </div>
      </div>
    );
  }
}

export default ShopInfo;