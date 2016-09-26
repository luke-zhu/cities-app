import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ExerciseView = ({ exercisePlaces }) => {
  const rows = [];
  exercisePlaces.forEach(e => rows.push(
    <tr key={e.place_id}>
      <td>{e.name}</td>
      <td>{e.rating}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Nearby Gyms</h3>
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

ExerciseView.propTypes = {
  exercisePlaces: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  exercisePlaces: state.exercisePlaces,
});

export default connect(mapStateToProps)(ExerciseView);
