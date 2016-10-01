import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const MusicView = ({ musicPlaces }) => {
  const rows = [];
  musicPlaces.forEach(e => rows.push(
    <tr key={e.place_id}>
      <td>{e.name}</td>
      <td>{e.stats.checkinsCount}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Music and Shows</h3>
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

MusicView.propTypes = {
  musicPlaces: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  musicPlaces: state.musicPlaces,
});

export default connect(mapStateToProps)(MusicView);
