import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const SportsView = ({ sportsTeams }) => {
  const rows = [];
  sportsTeams.forEach(e => rows.push(
    <tr key={e.place_id}>
      <td>{e.name}</td>
      <td>{e.stats.checkinsCount}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Sports Teams</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity (checkins)</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <img src="images/attribution_logo.png" />
    </div>
  );
};

SportsView.propTypes = {
  sportsTeams: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  sportsTeams: state.sportsTeams,
});

export default connect(mapStateToProps)(SportsView);
