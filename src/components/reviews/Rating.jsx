import React from 'react';


class Rating extends React.Component {

  render() {
    const coloredStahCount = this.props.rating;
    const clearStahCount = this.props.ratingRange - coloredStahCount;

    const coloredStahs = Array(coloredStahCount);
    const clearStahs = Array(clearStahCount);
    coloredStahs.fill("★");
    clearStahs.fill("☆");

    return (
      <div className="rating stahs">
        <span className="colored-stahs">{coloredStahs.join('')}</span>
        <span className="clear-stahs">{clearStahs.join('')}</span>
        </div>
    )
  }
}

export default Rating;
