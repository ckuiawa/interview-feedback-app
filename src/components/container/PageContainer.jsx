/**
 * This is the main container for the page.  It will

 **/
import React from 'react';

import SortOrder from '../sort/SortOrder';
import Pagination from '../pagination/Pagination';
import ReviewList from '../reviews/ReviewList';
import ReviewService from '../../services/ReviewService';
import * as SortField from '../container/Constants';

import './PageContainer.css';


class PageContainer extends React.Component {

  constructor() {
    super();

    this.getReviews = this.getReviews.bind(this);
    this.sortOrderUpdate = this.sortOrderUpdate.bind(this);
    this.getSortFieldAndDirection = this.getSortFieldAndDirection.bind(this);
    this.pageChanged = this.pageChanged.bind(this);

    this.reviewService = new ReviewService();

    this.state = {
      sortOrder: SortField.SORT_ORDER_HIGHEST,
      totalReviews: null,
      currentOffset: 0,
      itemsPerPage: 10,
      reviews: null
    }
  }

  getSortFieldAndDirection(sortOrder) {

    let sortField, ascending;
    switch (sortOrder) {
      case SortField.SORT_ORDER_HIGHEST:
        sortField = "Rating";
        ascending = false;
        break;
      case SortField.SORT_ORDER_LOWEST:
        sortField = "Rating";
        ascending = true;
        break;
      case SortField.SORT_ORDER_OLDEST:
        sortField = "LastModificationTime";
        ascending = false;
        break;
      case SortField.SORT_ORDER_NEWEST:
        sortField = "LastModificationTime";
        ascending = true;
        break;
      default:
        sortField = "Rating";
        ascending = false;
        break;
    }
    return {
      sortField,
      ascending
    };

  }

  getReviews() {

    const { sortOrder, currentOffset, itemsPerPage } = this.state;
    const { sortField, ascending } = this.getSortFieldAndDirection(sortOrder);

    const promise = this.reviewService.getProductReviews(this.props.productId, sortField, ascending, currentOffset, itemsPerPage);

    const count = this.reviewService.getProductReviewCount(this.props.productId);

    // promise.then( (reviews) =>  {
    //   this.setState( {reviews: reviews })
    // });
    this.setState( {
      reviews: promise,
      totalReviews: count
    } );
  }

  componentWillMount() {
    this.getReviews();
  }

  sortOrderUpdate(event) {

    const newSortOrder = event.target.value;
    const { itemsPerPage } = this.state;
    const sortOrderAndField = this.getSortFieldAndDirection(newSortOrder);
    const { sortField, ascending } = sortOrderAndField;

    // When changing sort order, start back at first page.
    const newOffset = 0;

    this.setState( {
      sortOrder: newSortOrder,
      currentOffset: newOffset
    } );

    const promise = this.reviewService.getProductReviews(this.props.productId, sortField, ascending, newOffset, itemsPerPage);

    // promise.then( (reviews) =>  {
    //   this.setState( {reviews: reviews })
    // });
    this.setState( {
      reviews: promise
    } );
  };

  pageChanged(event) {
    const newOffset = new Number(event.target.value);

    const { sortOrder, currentOffset, itemsPerPage } = this.state;
    const { sortField, ascending } = this.getSortFieldAndDirection(sortOrder);

    const promise = this.reviewService.getProductReviews(this.props.productId, sortField, ascending, newOffset, itemsPerPage);

    this.setState( {
      currentOffset: new Number(newOffset),
      reviews: promise
    });

  }

  render() {

    const { totalReviews, sortOrder, currentOffset, itemsPerPage, reviews } = this.state;

    const offsetStart = currentOffset + 1; // offset is 0 based, most people need 1 based.
    const offsetEnd = offsetStart + itemsPerPage - 1;

    return (

      <div className="page-container">

        <h2>All Customer Reviews</h2>
        <p>Showing {offsetStart}-{offsetEnd} of {this.state.totalReviews } reviews</p>

        <div>
          <SortOrder sortOrder={sortOrder} onSortOrderChanged= {this.sortOrderUpdate}></SortOrder>
          <ReviewList reviews={reviews} itemsPerPage={itemsPerPage}></ReviewList>
          <Pagination totalItems={new Number(totalReviews)} itemsPerPage={new Number(itemsPerPage)} currentOffset={new Number(currentOffset)} onPageChange={this.pageChanged}></Pagination>

        </div>
      </div>
    );
  }

}

export default PageContainer;
