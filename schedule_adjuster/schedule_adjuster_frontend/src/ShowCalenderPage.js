import React from 'react';
import Calender from "./Calender";
import AddableCalender from "./AddableCalender";
import moment from "moment";

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

class ShowCalenderPage extends React.Component {
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

  componentDidMount() {
    this.setState({whichVisibleCalenderParentDiv: 0});
  }

  onLayoutChange = layout => {
    this.setState({layout: layout});
  };

  onClickNext() {
    this.setState({whichVisibleCalenderParentDiv: Math.min(numberOfWeekCalenders - 1, this.state.whichVisibleCalenderParentDiv + 1)});
  }

  onClickBack() {
    console.log("Clicked Back");
    this.setState({whichVisibleCalenderParentDiv: Math.max(0, this.state.whichVisibleCalenderParentDiv - 1)});
    console.log(this.state);
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

      list.push(
        <div id={"calenderParentDiv" + i}
             style={{display: this.state.whichVisibleCalenderParentDiv === null || this.state.whichVisibleCalenderParentDiv === i ? "inline" : "none"}}>
          <Calender onLayoutChange={this.onLayoutChange} calenderID={i} calenderDates={calenderDates}/>
        </div>
      )
    }
    return (
      <div className="CalenderPage">
        <div id={"title-section"}>
          <h1>{calenderDetail.title}</h1>
          <h2>{this.props.match.params.calender_url}</h2>
          <h2>{calenderDetail.description}</h2>
        </div>
        <div id={"calender-section"}>
          {list}
          <div>
            <button onClick={this.onClickBack.bind(this)}>back</button>
            <button onClick={this.onClickNext.bind(this)}>next</button>
          </div>
          <div>
            <button>save</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowCalenderPage;