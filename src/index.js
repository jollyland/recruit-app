import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
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
console.log(addComma(-7855948.9527))

const getNumberIntervals = (intervals) => {
  let events = [];
  let result = {
      overlap: [],
      notInclude: []
  };
  // 將點進行分類並排序
  intervals.forEach(interval => {
      events.push({ point: interval[0], type: 'start' });
      events.push({ point: interval[1], type: 'end' });
  });

  events.sort((a, b) => {
      if (a.point !== b.point) {
          return a.point - b.point;
      } else {
          return a.type === 'start' ? -1 : 1;
      }
  });
  console.log(events)

  let count = 0;
  let lastEnd = -1;
  let overlapStart = -1;

  // line sweep 計算事件區間交點數
  events.forEach((event, index) => {
      if (event.type === 'start') {
        if (count === 0) {  // 沒有交點->有交點 區間沒有被包含
          if (index !== 0) {
            result.notInclude.push([events[index-1].point+1, event.point-1])
          } else {
            result.notInclude.push([0,event.point-1])
          }
        }
        if (count === 1) { // 一個交點->兩個交點 重疊開始
          overlapStart = event.point
        }
        count++;
      } else {
        lastEnd = event.point;
        if (count === 2) { // 兩個交點->一個交點 重疊結束
            result.overlap.push([overlapStart, lastEnd]);
        }
        count--;
      }
  });

  if (lastEnd < 20) { // input沒有20 event的情形
      result.notInclude.push([lastEnd + 1, 20]);
  }

  return result;
}

let intervals = [[6, 11], [5, 8], [17, 20], [7, 7], [14,17]];
// let intervals = [[3, 7], [2, 4], [7, 11], [5, 8], [10,12]];
console.log(getNumberIntervals(intervals));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
