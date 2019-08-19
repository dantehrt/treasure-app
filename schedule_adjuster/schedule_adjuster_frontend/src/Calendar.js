import React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import _ from "lodash";
import './Calendar.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const initialGridWidth = 1;
const initialGridHeight = 1;
const gridMinWidth = 1;
const gridMaxWidth = 1;
const gridMinHeight = 1;
const gridRowHeight = 30;
const calendarMarginX = 0;
const calendarMarginY = 0;
const numberOfColumns = 8;
const numberOfRows = 50;
//曜日
const dow = {
  "日": 0,
  "月": 1,
  "火": 2,
  "水": 3,
  "木": 4,
  "金": 5,
  "土": 6,
};

let calendarDivWidth = null;

class Calendar extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: {lg: numberOfColumns, md: numberOfColumns, sm: numberOfColumns, xs: numberOfColumns, xxs: numberOfColumns},
    rowHeight: gridRowHeight,
    compactType: null,
    preventCollision: true,
    margin: [calendarMarginX, calendarMarginY],
  };

  constructor(props) {
    super(props);

    const items = [];
    const bottomGridText = "見えないはずだよ";
    const baseGridContent = {
      i: null,
      x: 0,
      y: numberOfRows,
      w: numberOfColumns,
      h: 2,
      gridText: null,
      static: true,
      gridType: null,
      minW: gridMinWidth,
      maxW: gridMaxWidth,
      minH: gridMinHeight,
    };
    //　24時過ぎまで伸ばせないように，一番下にGridを敷いている
    let gridContent = baseGridContent;
    gridContent["i"] = bottomGridText;
    gridContent["gridText"] = bottomGridText;
    gridContent["gridType"] = "bottomGrid";
    items.push(Object.assign({}, gridContent));
    //時間のグリッドを追加
    for (let i = 0; i < 25; i++) {
      gridContent = baseGridContent;
      gridContent["i"] = i.toString() + ":00";
      gridContent["gridText"] = i.toString() + ":00";
      gridContent["y"] = i * 2;
      gridContent["w"] = 1;
      gridContent["gridType"] = "timeGrid";
      items.push(Object.assign({}, gridContent));
    }
    const calendarDates = this.props.calendarDates;
    //曜日のグリッドを追加
    for (let i = 0; i < 7; i++) {
      gridContent = baseGridContent;
      gridContent["i"] = Object.keys(dow)[i];
      gridContent["gridText"] = Object.keys(dow)[i];
      gridContent["x"] = i + 1;
      gridContent["y"] = 0;
      gridContent["w"] = 1;
      gridContent["gridType"] = "dateGrid";
      items.push(Object.assign({}, gridContent));
    }
    //unableGridを追加
    for (let i in calendarDates) {
      if (calendarDates[i] === null) {
        gridContent = baseGridContent;
        gridContent["i"] = "null" + (i + 1).toString();
        gridContent["gridText"] = "null" + (i + 1).toString();
        gridContent["x"] = Number(i) + 1;
        gridContent["y"] = 2;
        gridContent["w"] = 1;
        gridContent["h"] = 48;
        gridContent["gridType"] = "unableGrid";
        items.push(Object.assign({}, gridContent));
      }
    }

    //ここで予定を入れる
    let maxNumberOfPeopleOfEachSchedule = 0;
    if (this.props.candidateScheduleJSONsList) {
      for (let [date, candidateScheduleJSONs] of Object.entries(this.props.candidateScheduleJSONsList)) {
        for (let schedule of candidateScheduleJSONs) {
          console.log(schedule);
          // console.log(date);
          // console.log(schedule);
          gridContent = baseGridContent;
          gridContent["i"] = date + "_" + schedule.start_time + "-" + schedule.end_time;
          gridContent["gridText"] = schedule.people;
          gridContent["x"] = dow[schedule.dow] + 1;
          gridContent["y"] = schedule.start_time * 2 + 2;
          gridContent["w"] = 1;
          gridContent["h"] = (schedule.end_time - schedule.start_time) * 2;
          gridContent["gridType"] = "candidateSchedule";
          items.push(Object.assign({}, gridContent));
          console.log(schedule);
          maxNumberOfPeopleOfEachSchedule = schedule.people.length > maxNumberOfPeopleOfEachSchedule ? schedule.people.length : maxNumberOfPeopleOfEachSchedule;
        }
      }
    }

    this.state = {
      items: items,
      newCounter: 0,
      calendarBackendStyle: {},
      maxNumberOfPeopleOfEachSchedule: maxNumberOfPeopleOfEachSchedule
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  componentDidMount() {
    const element = document.getElementById("calendar" + this.props.calendarID).getBoundingClientRect();
    calendarDivWidth = Math.floor(element.width);
    const gridWidth = calendarDivWidth / numberOfColumns;
    const calendarBackendStyle = {
      height: (gridRowHeight + calendarMarginY) * numberOfRows,
      background: "linear-gradient(#000 1px, transparent 0), linear-gradient(90deg, #000 1px, transparent 0)",
      backgroundSize: gridWidth + "px " + gridRowHeight + "px",
    };
    this.setState({calendarBackendStyle: calendarBackendStyle})
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const key = el.i;
    const gridText = el.gridText;
    const bottomGridStyle = {
      position: "relative",
      background: "#b0c4de",
      opacity: 0.5,
    };
    const timeGriStyle = {
      position: "relative",
      background: "white",
      textAlign: "center"
    };
    const dateGridStyle = {
      position: "relative",
      background: "white",
      textAlign: "center"
    };
    const unableGridStyle = {
      position: "relative",
      background: "gray",
      textAlign: "center",
      opacity: "0.3"
    };
    const newScheduleGridStyle = {
      position: "relative",
      background: "#b0c4de",
    };
    const candidateScheduleGridStyle = {
      position: "relative",
      background: "#8ede43",
      opacity: gridText ? gridText.length / this.state.maxNumberOfPeopleOfEachSchedule : 1,
    };

    let contentOfGrid = null;
    let removeButton = null;
    let gridStyle = null;
    if (el.gridType === "bottomGrid") {
      gridStyle = bottomGridStyle;
      contentOfGrid =
        <span className="text" style={{position: "absolute", bottom: "0", alignItems: "center"}}>{gridText}</span>;
    } else if (el.gridType === "timeGrid") {
      gridStyle = timeGriStyle;
      contentOfGrid =
        <span className="text" style={{position: "absolute", bottom: "0", alignItems: "right"}}>{gridText}</span>;
    } else if (el.gridType === "dateGrid") {
      gridStyle = dateGridStyle;
      contentOfGrid = <span className="text" style={{position: "absolute", bottom: "0"}}>{gridText}</span>;
    } else if (el.gridType === "unableGrid") {
      gridStyle = unableGridStyle;
    } else if (el.gridType === "candidateSchedule") {
      gridStyle = candidateScheduleGridStyle;
      // let peopleSpan = [];
      // for (let person of gridText) {
      //   peopleSpan.push(<span className="text" style={{fontSize:4}}>{person}</span>);
      //   peopleSpan.push(<br></br>);
      // }
      // contentOfGrid = peopleSpan;
      contentOfGrid =
        <div style={{width: "95%"}}>
          <span className="text">{gridText.join(",")}</span>
        </div>;
      removeButton = <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, key)}>x</span>
    } else {
      gridStyle = newScheduleGridStyle;
      removeButton = <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, key)}>x</span>
    }
    return (
      <div key={key} data-grid={el} style={gridStyle} onClick={(e) => e.stopPropagation()}>
        {contentOfGrid}
        {removeButton}
      </div>
    );
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({layout: layout});
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({items: _.reject(this.state.items, {i: i})});
  }


  render() {
    const calendarStyle = {
      height: (gridRowHeight + calendarMarginY) * numberOfRows,
      width: "100%",
      position: "absolute",
      background: "",
      zIndex: 2,
      top: 0,
      left: 0,
      borderBottom: "1px solid #000000"
    };

    return (
      <div>
        {/*+2しているのは，divが重なるのを防ぐため*/}
        <div style={{
          position: "relative",
          height: (gridRowHeight + calendarMarginY) * (numberOfRows + 2),
          width: "100%",
        }}>
          <div id={"calendar" + this.props.calendarID} style={calendarStyle}>
            <ResponsiveReactGridLayout
              onLayoutChange={this.onLayoutChange}
              onBreakpointChange={this.onBreakpointChange}
              {...this.props}
            >
              {_.map(this.state.items, el => this.createElement(el))}
            </ResponsiveReactGridLayout>
          </div>
          <div id={"calendarBackground" + this.props.calendarID} className={"calendarBackground"}
               style={this.state.calendarBackendStyle}>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;