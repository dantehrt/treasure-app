import React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import _ from "lodash";
import './Calender.css'
import Calender from "./Calender";
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

class AddableCalender extends Calender {
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

    this.state = {
      items: items,
      newCounter: 0,
      calenderBackendStyle: {},
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  onAddItem(rowIndex, columnIndex) {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: columnIndex,
        y: rowIndex, // puts it at the bottom
        w: initialGridWidth,
        h: initialGridHeight,
        minW: gridMinWidth,
        maxW: gridMaxWidth,
        minH: gridMinHeight,
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  clickCalender(e) {
    const element = document.getElementById("calender" + this.props.calenderID).getBoundingClientRect();
    const elementTopX = Math.floor(element.x);
    const elementTopY = Math.floor(element.y);
    const elementWidth = Math.floor(element.width);
    const clickPointX = e.clientX - elementTopX;
    const clickPointY = e.clientY - elementTopY;
    const gridTotalWidth = elementWidth - (this.props.cols.lg + 1) * calenderMarginX;
    const gridWidth = Math.floor(gridTotalWidth / this.props.cols.lg);
    const columnIndex = Math.min(Math.floor(clickPointX / (gridWidth + calenderMarginX)), numberOfColumns - 1);
    const rowIndex = Math.min(Math.floor(clickPointY / (this.props.rowHeight + calenderMarginY)), 47);

    console.log("##############");
    console.log("clickPointX", clickPointX);
    console.log("clickPointY", clickPointY);
    console.log("elementWidth", elementWidth);

    console.log("gridWidth", gridWidth);
    console.log("columnIndex", columnIndex);
    console.log("rowIndex", rowIndex);

    this.onAddItem(rowIndex, columnIndex)
  }

  render() {
    console.log(this.props);
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
          <div id={"calender" + this.props.calenderID} onClick={this.clickCalender.bind(this)} style={calenderStyle}>
            <ResponsiveReactGridLayout
              onLayoutChange={this.onLayoutChange}
              onBreakpointChange={this.onBreakpointChange}
              {...this.props}
            >
              {_.map(this.state.items, el => this.createElement(el))}
            </ResponsiveReactGridLayout>
          </div>
          <div id={"calenderBackground" + this.props.calenderID} className={"calenderBackground"}
               style={this.state.calenderBackendStyle}>
          </div>
        </div>
      </div>
    );
  }
}

export default AddableCalender;