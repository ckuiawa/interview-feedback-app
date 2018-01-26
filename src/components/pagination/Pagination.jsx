
import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.css';

class Pagination extends React.Component {

  constructor() {
    super();

    this.getButton = this.getButton.bind(this);
    this.getPageButtons = this.getPageButtons.bind(this);
  }


  getButton(text, buttonOffset, currentButton, additionalClasses) {

    // Normally I would use classNames NPM package here.
    // Just doing concat to be quick.
    let classes = `page-button ${additionalClasses}`;
    if (currentButton) {
      classes = `${classes} current-button`;
    }

    return (
      <button
        key={text}
        className={classes}
        disabled={currentButton}
        onClick={this.props.onPageChange}
        name={text}
        value={buttonOffset}
      >{text}</button>
    )
  }

  getPageButtons(itemsPerPage, totalItems, currentOffset) {

    const numButtons = totalItems / itemsPerPage;
    const currentPage = currentOffset / itemsPerPage;

    const buttons = [];

    let disabled = false;
    let currentButton = false;
    let newOffset = currentOffset;

    if (currentOffset < itemsPerPage) {
      // on the first page, so disable home
      currentButton = true;
    }

    newOffset = currentOffset - itemsPerPage;
    buttons.push(this.getButton("< PREV", newOffset, currentButton, "page-button-jump"));
    currentButton = false;
    let currentPageStart = 0;
    let currentPageEnd = itemsPerPage;
    for(var i=0; i< numButtons; i++) {
      currentButton = currentOffset >= currentPageStart && currentOffset < currentPageEnd;
      buttons.push(this.getButton(i + 1, currentPageStart, currentButton));

      currentPageStart +=itemsPerPage;
      currentPageEnd += itemsPerPage;
    };
    newOffset = currentOffset + itemsPerPage;
    buttons.push(this.getButton("NEXT >", newOffset, currentButton, "page-button-jump"));

    return buttons;
  }

  render() {

    const { itemsPerPage, totalItems, currentOffset} = this.props;

    const pageButtons = this.getPageButtons(itemsPerPage, totalItems, currentOffset).map( button => {
      return button;
    })

    return (
      <div className="page-buttons">
        {pageButtons}
      </div>
    )
  }
}

Pagination.PropTypes = {
  totalItems: PropTypes.number.required,
  itemsPerPage: PropTypes.number.required,
  currentOffset: PropTypes.number.required,
  onPageChange: PropTypes.func.required
};

export default Pagination;
