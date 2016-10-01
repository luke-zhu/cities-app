import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const TravelView = ({ travelPlaces }) => {
  const rows = [];
  travelPlaces.forEach(e => rows.push(
    <tr key={e.place_id}>
      <td>{e.name}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Closest Airports</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

TravelView.propTypes = {
  travelPlaces: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  travelPlaces: state.travelPlaces,
});

export default connect(mapStateToProps)(TravelView);
