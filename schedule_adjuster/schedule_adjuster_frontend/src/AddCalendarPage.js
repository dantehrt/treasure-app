import React from 'react';
import GridLayout from 'react-grid-layout';
import AddableCalendar from "./AddableCalendar";
import ShowCalendarPage from "./ShowCalendarPage";
import moment from "moment";

class AddCalendarPage extends ShowCalendarPage {
  render() {
    let list = [];
    for (let i = 0; i < this.state.numberOfWeekCalendars; i++) {
      list.push(
        <div id={"calendarParentDiv" + i}
             style={{display: this.state.whichVisibleCalendarParentDiv === null || this.state.whichVisibleCalendarParentDiv === i ? "inline" : "none"}}>
          <AddableCalendar onLayoutChange={this.onLayoutChange} calendarID={i} calendarDates={this.state.calendarDatesList[i]}/>
        </div>
      )
    }
    return (
      <div className="CalendarPage">
        <div id={"title-section"}>
          <h1>AddableCalendarPageだよ〜〜</h1>
          <h2>{this.props.match.params.calendar_url}</h2>
          <h2>コメント</h2>
        </div>
        <div id={"calendar-section"}>
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

export default AddCalendarPage;