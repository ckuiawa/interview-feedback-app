
import React from 'react';
import Rating from './Rating';
import './reviews.css';
import moment from 'moment';

class Review extends React.Component {



  getDate(date) {
   return moment(date).format('MMMM, D, YYYY, hh:mm')
  }

  render() {

    const { review } = this.props;

    return (
      <div className="review">
        <span>
          <Rating rating={review.Rating} ratingRange={review.RatingRange}></Rating>
          <title>{review.title}</title>
        </span>
        <span className="user-date"> By {review.UserNickname} on { this.getDate(review.LastModificationTime) }</span>
        <span className="review-text">{review.ReviewText}</span>
      </div>
    );
  }
}

Review.PropTypes = {
  review: React.PropTypes.object
}



export default Review;
