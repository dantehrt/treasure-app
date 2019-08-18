import React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import _ from "lodash";
import './Calender.css'
import moment from "moment";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const initialGridWidth = 1;
const initialGridHeight = 1;
const gridMinWidth = 1;
const gridMaxWidth = 1;
const gridMinHeight = 1;
const gridRowHeight = 30;
const calenderMarginX = 0;
const calenderMarginY = 0;
const numberOfColumns = 8;
const numberOfRows = 50;
//曜日
const dow = {
  0: "日",
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
  6: "土",
};

let calenderDivWidth = null;

let resultsJSONs = [];
const tmp20190817 = [
  {
    "date": "2019-08-17",
    "dow": "土",
    "start_time": 10,
    "end_time": 12,
    "people": ["ダンテ", "立", "ひろき"]
  },
  {
    "date": "2019-08-17",
    "dow": "土",
    "start_time": 12,
    "end_time": 14,
    "people": ["立", "ひろき"]
  },
  {
    "date": "2019-08-17",
    "dow": "土",
    "start_time": 16,
    "end_time": 18,
    "people": ["ひろき"]
  },
  {
    "date": "2019-08-17",
    "dow": "土",
    "start_time": 20,
    "end_time": 24,
    "people": ["ダンテ"]
  },
];

const tmp20190819 = [
  {
    "date": "2019-08-19",
    "dow": "月",
    "start_time": 11,
    "end_time": 13,
    "people": ["ダンテ", "立", "ひろき"]
  },
  {
    "date": "2019-08-19",
    "dow": "月",
    "start_time": 17,
    "end_time": 19,
    "people": ["ひろき"]
  },
  {
    "date": "2019-08-19",
    "dow": "月",
    "start_time": 21,
    "end_time": 24,
    "people": ["ダンテ"]
  },
];

resultsJSONs = resultsJSONs.concat(tmp20190817, tmp20190819);
console.log(resultsJSONs);


class Calender extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: {lg: numberOfColumns, md: numberOfColumns, sm: numberOfColumns, xs: numberOfColumns, xxs: numberOfColumns},
    rowHeight: gridRowHeight,
    compactType: null,
    preventCollision: true,
    margin: [calenderMarginX, calenderMarginY],
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
      static: true,
      gridType: null,
      minW: gridMinWidth,
      maxW: gridMaxWidth,
      minH: gridMinHeight,
    };
    //　24時過ぎまで伸ばせないように，一番下にGridを敷いている
    let gridContent = baseGridContent;
    gridContent["i"] = bottomGridText;
    gridContent["gridType"] = "bottomGrid";
    items.push(Object.assign({}, gridContent));
    //時間のグリッドを追加
    for (let i = 0; i < 25; i++) {
      gridContent = baseGridContent;
      gridContent["i"] = i.toString() + ":00";
      gridContent["y"] = i * 2;
      gridContent["w"] = 1;
      gridContent["gridType"] = "timeGrid";
      items.push(Object.assign({}, gridContent));
    }

    const today = moment().add(-1, 'days');
    const weekStartDate = moment().add( today.day() + 1, 'days');
    console.log(today);
    console.log(weekStartDate);
    //曜日のグリッドを追加
    for (let i = 0; i < 7; i++) {
      gridContent = baseGridContent;
      gridContent["i"] = dow[i];
      gridContent["x"] = i + 1;
      gridContent["y"] = 0;
      gridContent["w"] = 1;
      gridContent["gridType"] = "dateGrid";
      items.push(Object.assign({}, gridContent));
    }

    //ここで予定を入れる
    for (let i = 0; i < 7; i++) {
      gridContent = baseGridContent;
      gridContent["i"] = (i + 1).toString();
      gridContent["x"] = i + 1;
      gridContent["y"] = i * 2 + 2;
      gridContent["w"] = 1;
      gridContent["gridType"] = "scheduleGrid";
      items.push(Object.assign({}, gridContent));
    }

    this.state = {
      items: items,
      newCounter: 0,
      calenderBackendStyle: {},
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  componentDidMount() {
    const element = document.getElementById("calender").getBoundingClientRect();
    calenderDivWidth = Math.floor(element.width);
    const gridWidth = calenderDivWidth / numberOfColumns;
    const calenderBackendStyle = {
      height: (gridRowHeight + calenderMarginY) * numberOfRows,
      background: "linear-gradient(#000 1px, transparent 0), linear-gradient(90deg, #000 1px, transparent 0)",
      backgroundSize: gridWidth + "px " + gridRowHeight + "px",
    };
    this.setState({calenderBackendStyle: calenderBackendStyle})
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      left: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
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
    const scheduleGridStyle = {
      position: "relative",
      background: "#b0c4de",
    };

    let contentOfGrid = null;
    let removeButton = null;
    let gridStyle = null;
    if (el.gridType === "bottomGrid") {
      gridStyle = bottomGridStyle;
      contentOfGrid =
        <span className="text" style={{position: "absolute", bottom: "0", alignItems: "center"}}>{i}</span>;
    } else if (el.gridType === "timeGrid") {
      gridStyle = timeGriStyle;
      contentOfGrid =
        <span className="text" style={{position: "absolute", bottom: "0", alignItems: "right"}}>{i}</span>;
    } else if (el.gridType === "dateGrid") {
      gridStyle = dateGridStyle;
      contentOfGrid = <span className="text" style={{position: "absolute", bottom: "0"}}>{i}</span>;
    } else {
      gridStyle = scheduleGridStyle;
      removeButton = <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>x</span>
    }
    return (
      <div key={i} data-grid={el} style={gridStyle} onClick={(e) => e.stopPropagation()}>
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
    const calenderStyle = {
      height: (gridRowHeight + calenderMarginY) * numberOfRows,
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
          height: (gridRowHeight + calenderMarginY) * (numberOfRows + 2),
          width: "100%",
        }}>
          <div id={"calender"} style={calenderStyle}>
            <ResponsiveReactGridLayout
              onLayoutChange={this.onLayoutChange}
              onBreakpointChange={this.onBreakpointChange}
              {...this.props}
            >
              {_.map(this.state.items, el => this.createElement(el))}
            </ResponsiveReactGridLayout>
          </div>
          <div id={"calenderBackground"} style={this.state.calenderBackendStyle}>
          </div>
        </div>
      </div>
    );
  }
}

export default Calender;