import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const ShoppingView = ({ shoppingPlaces }) => {
  const rows = [];
  shoppingPlaces.forEach(e => rows.push(
    <tr key={e.place_id}>
      <td>{e.name}</td>
      <td>{e.rating}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Nearby Shopping Centers</h3>
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

ShoppingView.propTypes = {
  shoppingPlaces: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  shoppingPlaces: state.shoppingPlaces,
});

export default connect(mapStateToProps)(ShoppingView);
