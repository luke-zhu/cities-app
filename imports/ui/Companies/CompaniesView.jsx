import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import CompanyView from './CompanyView.jsx';
import { switchCompaniesTab } from '../redux/actions.js';

const CompaniesView = ({ company, companies, selectedCompany, handleSelect }) => {
  const rows = [];
  const navItems = [];
  companies.filter((e, i) => i <= 10).forEach((c) => {
    navItems.push(<NavItem eventKey={c.name} key={c.name}>{c.name}</NavItem>);
    if (c.name === selectedCompany) {
      rows.push(<CompanyView companyObj={c} key={c.name} />);
    }
  });
  return (
    <div>
      <Nav
        bsStyle="pills"
        activeKey={selectedCompany}
        onSelect={handleSelect}
      >
        {navItems}
      </Nav>
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
  selectedCompany: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  company: state.company,
  companies: state.companies,
  selectedCompany: state.selectedCompany,
});

const mapDispatchToProps = dispatch => ({
  handleSelect: eventKey => dispatch(switchCompaniesTab(eventKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesView);

