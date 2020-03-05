import React, { Component } from 'react';
import './style.css'

const data = [
    {
      id: 1,
      keyword: "火锅",
      quantity: 8710
    },
    {
      id: 2,
      keyword: "火锅自助",
      quantity: 541
    },
    {
      id: 3,
      keyword: "火锅 三里屯",
      quantity: 65
    },
    {
      id: 4,
      keyword: "火锅 望京",
      quantity: 133
    },
    {
      id: 5,
      keyword: "火锅家常菜",
      quantity: 179
    }
  ];

class SearchBox extends Component {
    constructor(props){
        super(props)
        this.state={
            inputText:'',
        }
    }

    render() {
        return (
            <div className="searchBox">
                <div className="searchBox__container">
                    <input className="searchBox__text" value={this.state.inputText} onChange={this.handleChange}/>
                    <span className="searchBox__clear" onClick={this.handleClear}></span>
                    <span className="searchBox__cancel" onClick={this.handleCancel}>取消</span>
                </div>
                {this.state.inputText.length>0?
                this.renderSuggestList():null}
            </div>
        );
    }

    renderSuggestList(){
        return (
            <ul className="searchBox__list">
                {
                    data.map(item=>{
                        return (
                        <li className="searchBox__item">
                            <span className="searchBox__itemKeyword">
                                {item.keyword}
                            </span>
                            <span className="searchBox__itemQuantity">
                                约{item.quantity}个结果
                            </span>
                        </li>
                    )})
                }
            </ul>
        )
    }

    handleChange=(e)=>{
        this.setState({
            inputText:e.target.value
        })
    }

    handleClear=()=>{
        this.setState({
            inputText:''
        })
    }

    handleCancel=()=>{}
}

export default SearchBox;