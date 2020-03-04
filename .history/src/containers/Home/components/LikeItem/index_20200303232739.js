import React, { Component } from "react";
import "./style.css"

class LikeItem extends Component {
  render() {
    const {
      shop,
      tag,
      picture,
      product,
      currentPrice,
      oldPrice,
      saleDesc
    } = this.props.data;
    return (
      <a className="likeItem">
        <div className="likeItem__picContainer">
          <div className="likeItem__picTag">{tag}</div>
          <img className="likeItem__pic" src={picture} />
        </div>
        <div className="likeItem__content">
          <div className="likeItem__shop">{shop}</div>
          <div className="likeItem__product">{product}</div>
          <div className="likeItem__detail">
            <div className="likeItem__price">
              <ins className="likeItem__currentPrice">{currentPrice}</ins>
              <del className="likeItem__oldPrice">{oldPrice}</del>
            </div>
            <div className="likeItem__sale">{saleDesc}</div>
          </div>
        </div>
      </a>
    );
  }
}

export default LikeItem;
