import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Link to="/calender_url">CalenderPage</Link>
      </div>
    );
  }
}

export default Home;