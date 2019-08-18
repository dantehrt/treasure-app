import React from 'react';
import GridLayout from 'react-grid-layout';
import AddableCalender from "./AddableCalender";
import ShowCalenderPage from "./ShowCalenderPage";

const numberOfWeekCalenders = 3;

class AddCalenderPage extends ShowCalenderPage {
  render() {
    let list = [];
    let tmpStyle = null;
    for (let i = 0; i < numberOfWeekCalenders; i++) {
      tmpStyle = {display: ""};
      list.push(
        <div id={"calenderParentDiv" + i}
             style={{display: this.state.whichVisibleCalenderParentDiv === null || this.state.whichVisibleCalenderParentDiv === i? "inline" : "none"}}>
          <AddableCalender onLayoutChange={this.onLayoutChange} calenderID={i}/>
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