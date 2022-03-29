import React, { Component } from "react";
import Constants from './Constants.js';

class CurrencyModal extends Component{
    constructor(props){
        super(props);
        this.clickOverlay = this.clickOverlay.bind(this);

    }
    clickOverlay(){
document.querySelector('.currency-modal').classList.remove('active');
    }
    render(){
        return (
            <>

            <div className="currency-modal">

                <div className="currency-modal-title">
                    Значение валюты {this.props.archiveOneCurrencyData.code} в течение 10 дней
                </div>
<table>
    <thead>
    <tr>
    {this.props.archiveOneCurrencyData.data.map(i=>{
        return (
        <th key={Constants.today+i.date+'archiveOneCurrencyData-th-key'}>
            {i.date}
        </th>
        )          
    })}
    </tr>
    </thead>
    <tbody>
        <tr>
        {this.props.archiveOneCurrencyData.data.map(i=>{
        return (
        <td key={Constants.today+i.value+'archiveOneCurrencyData-td-key'}>
            {i.value}
        </td>
        
        )     
    })}
        </tr>

    </tbody>
</table>
            </div>
            <div className="currency-modal-overlay" onClick={this.clickOverlay}></div>

            </>
        ); 
    }
}

export default CurrencyModal;