import React from 'react';
import Calendar from "./Calendar";
import AddableCalendar from "./AddableCalendar";
import moment from "moment";

//テスト用
const calendarDetail = {
  "title": "titleだよ",
  "description": "description",
  "start_date": "2019-08-15",
  "end_date": "2019-08-30",
};

let startDate;
let calendarStartDate;
let endDate;

class ShowCalendarPage extends React.Component {
  constructor(props) {
    super(props);

    startDate = moment(calendarDetail.start_date.split(',')[0]);
    calendarStartDate = moment(startDate).subtract(startDate.day(), 'days');
    endDate = moment(calendarDetail.end_date.split(',')[0]);
    let numberOfWeekCalendars = Math.ceil((endDate.diff(calendarStartDate, 'days') + 1) / 7);

    let calendarDatesList = [];
    let targetDate = moment(startDate);
    for (let i = 0; i < numberOfWeekCalendars; i++) {
      console.log(targetDate.format('YYYY-MM-DD'));
      let calendarDates = [];
      let startDayOfWeek = 0;
      if (i === 0) {//初週
        startDayOfWeek = startDate.day();
        calendarDates = calendarDates.concat(Array.apply(null, Array(startDayOfWeek)).map(function () {
          return null
        }));
      }
      for (let j = startDayOfWeek; j < 7; j++) {
        if (endDate < targetDate) {
          calendarDates.push(null);
        } else {
          calendarDates.push(targetDate.format('YYYY-MM-DD'));
        }
        targetDate.add(1, 'days');
      }
      calendarDatesList.push(calendarDates);
    }

    this.state = {
      whichVisibleCalendarParentDiv: null,
      calendarDatesList: calendarDatesList,
      numberOfWeekCalendars: numberOfWeekCalendars,
    };
  }

  componentDidMount() {
    this.setState({whichVisibleCalendarParentDiv: 0});
  }

  onLayoutChange = layout => {
    this.setState({layout: layout});
  };

  onClickNext() {
    this.setState({whichVisibleCalendarParentDiv: Math.min(this.state.numberOfWeekCalendars - 1, this.state.whichVisibleCalendarParentDiv + 1)});
  }

  onClickBack() {
    console.log("Clicked Back");
    this.setState({whichVisibleCalendarParentDiv: Math.max(0, this.state.whichVisibleCalendarParentDiv - 1)});
    console.log(this.state);
  }

  render() {
    let list = [];
    for (let i = 0; i < this.state.numberOfWeekCalendars; i++) {
      list.push(
        <div id={"calendarParentDiv" + i}
             style={{display: this.state.whichVisibleCalendarParentDiv === null || this.state.whichVisibleCalendarParentDiv === i ? "inline" : "none"}}>
          <Calendar onLayoutChange={this.onLayoutChange} calendarID={i}
                    calendarDates={this.state.calendarDatesList[i]}/>
        </div>
      )
    }
    return (
      <div className="CalendarPage">
        <div id={"title-section"}>
          <h1>{calendarDetail.title}</h1>
          <h2>{this.props.match.params.calendar_url}</h2>
          <h2>{calendarDetail.description}</h2>
        </div>
        <div id={"calendar-section"}>
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

export default ShowCalendarPage;