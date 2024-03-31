import React, { useState } from "react";
import '../css/priceinput.css';


const addComma = (number)=>{
    // 假設有小數先拆分
    var numStr = number.toString();
    var decimalIndex = numStr.indexOf('.');
    var decimalPart = '';
    if (decimalIndex !== -1) {
        decimalPart = numStr.substring(decimalIndex);
        numStr = numStr.substring(0, decimalIndex);
    }
    // 整數部分加上逗號
    numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numStr + decimalPart;
  }

function PriceInput() {
    const [price,setPrice]=useState("0"); // 初始值為0

    const handleChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d.]/g, '');  // 因為加了逗號所以要先移除留下純數字
        const decimalCount = (value.match(/\./g) || []).length; // 找小數點
        if (decimalCount > 1) { // 移除多餘一個的小數點
            const lastIndex = value.lastIndexOf('.');
            value = value.substring(0, lastIndex) + value.substring(lastIndex + 1);
        }
        // 處理0開頭的數值
        if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
            value = value.substring(1);
        }
        setPrice(addComma(value));
    };

    return (
      <div className="priceInput">
        <div className="label">
          入住費用（每人每晚）
        </div>
        <div className="inputContainer">
            <div className="currency">TWD</div>
            <input type="text" placeholder="請輸入費用"
             value={price}
             onChange={handleChange}
             />
             <div className="hint"
             style={{ opacity: price === '' ? '100%' : '0'}}> 不可以為空白</div>
        </div>
        <div className="label right">
          輸入0表示免費
        </div>
      </div>
    );
  }
  export default PriceInput;