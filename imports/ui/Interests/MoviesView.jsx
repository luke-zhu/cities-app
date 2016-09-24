import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const MoviesView = ({ moviePlaces }) => {
  const rows = [];
  moviePlaces.forEach(e => rows.push(
    <tr key={e.name}>
      <td>{e.name}</td>
      <td>{e.rating}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Movies</h3>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
        </tr>
      </thead>
      <table className="table">
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
