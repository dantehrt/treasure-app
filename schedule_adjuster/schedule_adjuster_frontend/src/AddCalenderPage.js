import React from 'react';
import GridLayout from 'react-grid-layout';
import AddableCalender from "./AddableCalender";

class AddCalenderPage extends React.Component {
  onLayoutChange = layout => {
    this.setState({layout: layout});
  };

  render() {
    return (
      <div className="CalenderPage">
        <div id={"title-section"}>
          <h1>AddableCalenderPageだよ〜〜</h1>
          <h2>{this.props.match.params.calender_url}</h2>
          <h2>コメント</h2>
        </div>
        <div id={"calender-section"}>

          <AddableCalender onLayoutChange={this.onLayoutChange}/>
          <div>
            <button>back</button>
            <button>next</button>
          </div>
          <button>save</button>
        </div>
      </div>
    )
  }
}

export default AddCalenderPage;