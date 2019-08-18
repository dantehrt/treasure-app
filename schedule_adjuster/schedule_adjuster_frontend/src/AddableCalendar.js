import React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
import _ from "lodash";
import './Calendar.css'
import Calendar from "./Calendar";
import moment from "moment";

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

let calendarDivWidth = null;

class AddableCalendar extends Calendar {
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

  clickCalendar(e) {
    const element = document.getElementById("calendar" + this.props.calendarID).getBoundingClientRect();
    const elementTopX = Math.floor(element.x);
    const elementTopY = Math.floor(element.y);
    const elementWidth = Math.floor(element.width);
    const clickPointX = e.clientX - elementTopX;
    const clickPointY = e.clientY - elementTopY;
    const gridTotalWidth = elementWidth - (this.props.cols.lg + 1) * calendarMarginX;
    const gridWidth = Math.floor(gridTotalWidth / this.props.cols.lg);
    const columnIndex = Math.min(Math.floor(clickPointX / (gridWidth + calendarMarginX)), numberOfColumns - 1);
    const rowIndex = Math.min(Math.floor(clickPointY / (this.props.rowHeight + calendarMarginY)), 47);

    this.onAddItem(rowIndex, columnIndex)
  }

  render() {
    // console.log(this.props);
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
          <div id={"calendar" + this.props.calendarID} onClick={this.clickCalendar.bind(this)} style={calendarStyle}>
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

export default AddableCalendar;