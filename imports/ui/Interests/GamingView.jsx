import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

 // ping tests: League, CS:GO, Overwatch

const GamingView = ({ events }) => {
  const rows = [];
  events.filter(e => e[1].status === 'OK' && e[1].duration.value < 36000)
    .sort((e1, e2) => e1[1].duration.value - e2[1].duration.value)
    .forEach(e => rows.push(
      <tr key={e[0].summary}>
        <td>{e[0].summary}</td>
        <td>
          {moment.duration(e[1].duration.value, 'seconds').humanize()}
        </td>
      </tr>
    )
  );
  if (rows.length === 0) {
    rows.push(
      <tr key={'None notification'}>
        <td>
          There are no gaming events nearby.
          Try typing in your location again.
        </td>
      </tr>
    );
  }
  return (
    <div>
      <h3>Gaming</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Estimated Drive Time</th>
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
