import React from 'react';

import Review from './Review';
import './reviews.css';

class ReviewList extends React.Component {


  render() {

    const reviews = this.props.reviews.map( (review, index) => {
      return (
        <Review review={review} key={index}></Review>
      )

    });

    return (
      <div className="review-list">
        {reviews}
      </div>
      )
  }
}

ReviewList.PropTypes = {
  reviews: React.PropTypes.array,
  itemsPerPage: React.PropTypes.number
}

export default ReviewList;
