import React, { PropTypes } from 'react';

const CompanyView = ({ companyObj }) => (
  <div>
    <h3>
      <a href={companyObj.featuredReview.attributionURL}>
      {companyObj.name}
      </a>
    </h3>
    <table className="table">
      <tbody>
        <tr>
          <td>Overall Rating</td>
          <td>{companyObj.overallRating}</td>
        </tr>
        <tr>
          <td>Number of Ratings</td>
          <td>{companyObj.numberOfRatings}</td>
        </tr>
        <tr>
          <td>Industry Name</td>
          <td>{companyObj.industryName}</td>
        </tr>
        <tr>
          <td>Website:</td>
          <td><a href={`https://${companyObj.website}`}>
          {companyObj.website}</a></td>
        </tr>
        {companyObj.careerOpportunitiesRating !== '0.0' ?
          <tr>
            <td>Career Opportunities Rating</td>
            <td>{companyObj.careerOpportunitiesRating}</td>
          </tr> : null}
        {companyObj.compensationAndBenefitsRating !== '0.0' ?
          <tr>
            <td>Compensation and Benefits Rating</td>
            <td>{companyObj.compensationAndBenefitsRating}</td>
          </tr> : null}
        {companyObj.cultureAndValuesRating !== '0.0' ?
          <tr>
            <td>Culture and Value Rating</td>
            <td>{companyObj.cultureAndValuesRating}</td>
          </tr> : null}
        {companyObj.recommendToFriendRating !== '0.0' ?
          <tr>
            <td>Recommend to Friend Rating</td>
            <td>{companyObj.recommendToFriendRating}</td>
          </tr> : null}
        {companyObj.seniorLeadershipRating !== '0.0' ?
          <tr>
            <td>Senior Leadership Rating</td>
            <td>{companyObj.seniorLeadershipRating}</td>
          </tr> : null}
        {companyObj.workLifeBalanceRating !== '0.0' ?
          <tr>
            <td>Work Life Balance Rating</td>
            <td>{companyObj.workLifeBalanceRating}</td>
          </tr> : null}
      </tbody>
    </table>
  </div>
);

CompanyView.propTypes = {
  companyObj: PropTypes.object.isRequired,
};

export default CompanyView;
