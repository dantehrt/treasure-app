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

let candidateScheduleJSONs = {
  "candidateSchedules":
    {
      "2019-08-17": [
        {
          "dow": "土",
          "start_time": 10,
          "end_time": 12,
          "people": ["ダンテ", "立", "ひろき", "ひろき"]
        },
        {
          "dow": "土",
          "start_time": 12,
          "end_time": 14,
          "people": ["立", "ひろき"]
        },
        {
          "dow": "土",
          "start_time": 16,
          "end_time": 18,
          "people": ["ひろき"]
        },
        {
          "dow": "土",
          "start_time": 18,
          "end_time": 20,
          "people": ["ダンテ", "ダンテ"]
        },
        {
          "dow": "土",
          "start_time": 20,
          "end_time": 24,
          "people": ["ダンテ"]
        },
      ],
      "2019-08-19": [
        {
          "dow": "月",
          "start_time": 11,
          "end_time": 13,
          "people": ["ダンテ", "立", "ひろき"]
        },
        {
          "dow": "月",
          "start_time": 17,
          "end_time": 19,
          "people": ["ひろき"]
        },
        {
          "dow": "月",
          "start_time": 21,
          "end_time": 24,
          "people": ["ダンテ"]
        },
      ],
      "2019-08-20": [
        {
          "dow": "火",
          "start_time": 11,
          "end_time": 13,
          "people": ["ダンテ", "立", "ひろき"]
        },
        {
          "dow": "火",
          "start_time": 17,
          "end_time": 19,
          "people": ["ひろき"]
        },
        {
          "dow": "火",
          "start_time": 21,
          "end_time": 24,
          "people": ["ダンテ"]
        },
      ],
    }
};

class ShowCalendarPage extends React.Component {
  constructor(props) {
    super(props);

    startDate = moment(calendarDetail.start_date.split(',')[0]);
    calendarStartDate = moment(startDate).subtract(startDate.day(), 'days');
    endDate = moment(calendarDetail.end_date.split(',')[0]);
    let numberOfWeekCalendars = Math.ceil((endDate.diff(calendarStartDate, 'days') + 1) / 7);

    let calendarDatesList = [];
    let targetDate = moment(startDate);
    let candidateScheduleJSONsList = [];
    for (let i = 0; i < numberOfWeekCalendars; i++) {
      let rowCandidateScheduleJSONsList = [];
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
          if (candidateScheduleJSONs.candidateSchedules[targetDate.format('YYYY-MM-DD')]) {
            rowCandidateScheduleJSONsList.push(candidateScheduleJSONs.candidateSchedules[targetDate.format('YYYY-MM-DD')]);
          }
        }
        targetDate.add(1, 'days');
      }
      if (calendarDates != []) {
        calendarDatesList.push(calendarDates);
      }
      candidateScheduleJSONsList.push(rowCandidateScheduleJSONsList);
    }

    console.log(candidateScheduleJSONsList);

    this.state = {
      whichVisibleCalendarParentDiv: null,
      calendarDatesList: calendarDatesList,
      numberOfWeekCalendars: numberOfWeekCalendars,
      candidateScheduleJSONsList: candidateScheduleJSONsList,
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