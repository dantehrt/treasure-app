import React from 'react';
import GridLayout from 'react-grid-layout';
import AddableCalender from "./AddableCalender";
import ShowCalenderPage from "./ShowCalenderPage";
import moment from "moment";

//テスト用
const calenderDetail = {
  "title": "titleだよ",
  "description": "description",
  "start_date": "2019-08-17,土",
  "end_date": "2019-08-30,金",
};


let numberOfWeekCalenders;
let startDate;
let calenderStartDate;
let endDate;

class AddCalenderPage extends ShowCalenderPage {
  constructor(props) {
    super(props);

    this.state = {
      whichVisibleCalenderParentDiv: null,
    };

    startDate = moment(calenderDetail.start_date.split(',')[0]);
    calenderStartDate = moment(startDate).subtract(startDate.day(), 'days');
    endDate = moment(calenderDetail.end_date.split(',')[0]);
    numberOfWeekCalenders = Math.ceil(endDate.diff(calenderStartDate, 'days') / 7);
  }
  
  render() {
    let list = [];
    let targetDate = moment(startDate);
    for (let i = 0; i < numberOfWeekCalenders; i++) {
      let calenderDates = [];
      if (i === 0) {
        calenderDates = calenderDates.concat(Array.apply(null, Array(startDate.day())).map(function () {
          return null
        }));
        for (let j = 0; j < 7; j++) {
          if (endDate < targetDate) {
            calenderDates.push(null);
          } else {
            calenderDates.push(targetDate.format('YYYY-MM-DD'));
          }
          targetDate.add(1, 'days');
          if (calenderDates.length >= 7) {
            break
          }
        }
      } else {
        for (let j = 0; j < 7; j++) {
          if (endDate < targetDate) {
            calenderDates.push(null);
          } else {
            calenderDates.push(targetDate.format('YYYY-MM-DD'));
          }
          targetDate.add(1, 'days')
        }
      }
      console.log(calenderDates);

      list.push(
        <div id={"calenderParentDiv" + i}
             style={{display: this.state.whichVisibleCalenderParentDiv === null || this.state.whichVisibleCalenderParentDiv === i ? "inline" : "none"}}>
          <AddableCalender onLayoutChange={this.onLayoutChange} calenderID={i} calenderDates={calenderDates}/>
        </div>
      )
    }
    return (
      <div className="CalenderPage">
        <div id={"title-section"}>
          <h1>AddableCalenderPageだよ〜〜</h1>
          <h2>{this.props.match.params.calender_url}</h2>
          <h2>コメント</h2>
        </div>
        <div id={"calender-section"}>
          {list}
          <div>
            <button onClick={this.onClickBack.bind(this)}>back</button>
            <button onClick={this.onClickNext.bind(this)}>next</button>
          </div>
          <button>save</button>
        </div>
      </div>
    )
  }
}

export default AddCalenderPage;