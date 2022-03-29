import React, { Component } from "react";
import Constants from './Constants.js';
import CurrencyModal from './CurrencyModal';

class GetCurrencyData extends Component{
    constructor(props){
        super(props);
        this.ajaxRequest = this.ajaxRequest.bind(this);
        this.openCurrencyModal = this.openCurrencyModal.bind(this);
        
        this.state = {
            todayAllCurrencyData: {
                date: '',
                previousDate: '',
                previousUrl: '',
                valutes: []
              },
            archiveOneCurrencyData: {
                code: '',
                data: []
            }
        }
    }
    getValuteDynamic(val, valPrev){
let result = (val-valPrev)*100/val;
return result.toFixed(2)+'%';
    }
    prepareValuteData(data){
        
return Object.values(data).map(i=>{
    return {
        CharCode: i.CharCode,
        Name: i.Name,
        Nominal: i.Nominal,
        Dynamic: this.getValuteDynamic(i.Value, i.Previous),
        Value: i.Nominal>1 ? `${i.Value.toFixed(2)}/${i.Nominal}` : i.Value.toFixed(2)
    }
});
    }
    openCurrencyModal(e){
        let archiveDataArr = [];
        let code = e.currentTarget.dataset.code;
        let url = this.state.todayAllCurrencyData.previousUrl;
        let iter = 0;
        let iterQty = 10;

        let that = this;
    
        function getCurrencyArchiveData(url, iter){
            if(iter == iterQty){
                that.setState({
                    archiveOneCurrencyData: {
                        code: code,
                        data: archiveDataArr.reverse()
                    } 
                });
        document.querySelector('.currency-modal').classList.add('active');
 
                return;
            }
            fetch(url)
            .then((response) => {
              return response.json();
            })
            .then((article) => {
                let articleDate = new Date(article.Date);
                let articleDateMonth = articleDate.getMonth();
                let articleDateMonthVal = String(articleDateMonth).length<2 ? `0${articleDateMonth}` : articleDateMonth;
                let articleDateDay = articleDate.getDate();
                let articleDateDayVal = String(articleDateDay).length<2 ? `0${articleDateDay}` : articleDateDay;
                archiveDataArr.push({
                  date: `${articleDateDayVal}.${articleDateMonthVal}`,
                  value: article.Valute[code].Value.toFixed(2),
              });
              iter++;
              getCurrencyArchiveData(article.PreviousURL, iter)
            })
            .catch((err)=>{
            console.log(err)
            });
        }
        getCurrencyArchiveData(url, iter);
    
    }
  
ajaxRequest(){
    let url = `${Constants.cbr_url}/daily_json.js`;
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((article) => {
       
      this.setState({
          todayAllCurrencyData: {
            date: article.Date,
            previousDate: article.PreviousDate,
            previousUrl: article.PreviousURL,
            valutes: this.prepareValuteData(article.Valute)
          },

      });

    })
    .catch((err)=>{
    console.log(err)
    });
    }    
componentDidMount(){
    this.ajaxRequest();
}
    render(){
        return (
            <>
                {
                this.state.todayAllCurrencyData.valutes.map(i=>{
                   return (
                   <tr key={Constants.today+i.CharCode+'-CharCode-key'} data-code={i.CharCode} onClick={this.openCurrencyModal}>
                <td>
                   {i.CharCode}
                   <span className="tooltip">{i.Name}</span>
                   </td>
                   <td>
                       {i.Value}
                   </td>
                   <td>
                       {i.Dynamic}

                   </td>
           </tr>
           
                   )
                })
            }
<tr className="currency-table-tr-modal">
    <td colSpan={3}>
    <CurrencyModal archiveOneCurrencyData = {this.state.archiveOneCurrencyData}  />           
    </td>
</tr>
            </>
        ); 
    }
}
export default GetCurrencyData;