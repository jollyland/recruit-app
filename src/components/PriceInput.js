import '../css/priceinput.css';

function PriceInput() {
    return (
      <div className="priceInput">
        <div className="label">
          入住費用（每人每晚）
        </div>
        <div className="inputContainer">
            <div className="currency">TWD</div>
            <input type="text" placeholder="請輸入費用"></input>
            <div className="hint">不可以為空白</div>
        </div>
        <div className="label right">
          輸入0表示免費
        </div>
      </div>
    );
  }
  export default PriceInput;