import React from 'react';
import Calender from "./Calender";

const calenderDetail = {
  "title": "titleだよ",
  "description": "description",
  "start_date": "2019-08-17,土",
  "end_date": "2019-08-30,金",
};

class ShowCalenderPage extends React.Component {
  onLayoutChange = layout => {
    this.setState({ layout: layout });
  };

  render() {
    return (
      <div className="CalenderPage">
        <div id={"title-section"}>
          <h1>{calenderDetail.title}</h1>
          <h2>{this.props.match.params.calender_url}</h2>
          <h2>{calenderDetail.description}</h2>
        </div>
        <div id={"calender-section"}>
          <div>
            <Calender onLayoutChange={this.onLayoutChange} start_date={calenderDetail.start_date} end_date={calenderDetail.end_date} />
          </div>
          <div>
            <Calender onLayoutChange={this.onLayoutChange} start_date={calenderDetail.start_date} end_date={calenderDetail.end_date} />
          </div>
          <div>
            <button>back</button>
            <button>next</button>
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