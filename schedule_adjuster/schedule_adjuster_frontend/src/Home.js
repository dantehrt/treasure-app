import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Link to="/calendar_url">CalendarPage</Link>
      </div>
    );
  }
}

export default Home;