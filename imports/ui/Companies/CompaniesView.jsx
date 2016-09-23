import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CompanyView from './CompanyView.jsx';

const CompaniesView = ({ company, companies }) => {
  const rows = [];
  companies.forEach(c => rows.push(
    <CompanyView companyObj={c} key={c.name} />
  ));
  return (
    <div>
      <h3>{company}</h3>
      {rows}
      <h6>
        <a href="https://www.glassdoor.com/index.htm">
          powered by
          <img
            src="https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png"
            title="Job Search"
          />
        </a>
      </h6>
    </div>
  );
};

CompaniesView.propTypes = {
  company: PropTypes.string.isRequired,
  companies: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  company: state.company,
  companies: state.companies,
});

export default connect(mapStateToProps)(CompaniesView);

