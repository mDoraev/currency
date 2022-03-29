import React, { Component } from "react";
// import CurrencyTableTr from './CurrencyTableTr'
import GetCurrencyData from "./GetCurrencyData";

function currencyTable(){
    return(
        <table className="currency-table">
            <thead>
                <tr>
                <th>
                Код валюты
                </th>
                <th>
Значение в рублях
                </th>
                <th>
                Процентное изменение курса
                </th>
                </tr>

            </thead>
            <tbody>
            {/* <CurrencyTableTr /> */}
            <GetCurrencyData />
            </tbody>
        </table>
    )
}

export default currencyTable;
