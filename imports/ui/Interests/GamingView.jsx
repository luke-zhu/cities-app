import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

 // ping tests: League, CS:GO, Overwatch

const GamingView = ({ events }) => {
  const rows = [];
  console.log(events);
  events.forEach(e => rows.push(
    <tr key={e[0].summary}>
      <td>{e[0].summary}</td>
      <td>{moment.duration(e[1], 'seconds').humanize()}</td>
    </tr>
    )
  );
  return (
    <div>
      <h3>Gaming</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Estimated Driving Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

GamingView.propTypes = {
  events: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  events: state.gamingEvents,
});

export default connect(mapStateToProps)(GamingView);
