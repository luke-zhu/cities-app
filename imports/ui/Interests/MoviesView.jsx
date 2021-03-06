import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const MoviesView = ({ moviePlaces }) => {
  const rows = [];
  moviePlaces.forEach(e => rows.push(
    <tr key={e.place_id}>
      <td>{e.name}</td>
      <td>{e.rating}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Nearby Movie Theaters</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

MoviesView.propTypes = {
  moviePlaces: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  moviePlaces: state.moviePlaces,
});

export default connect(mapStateToProps)(MoviesView);
