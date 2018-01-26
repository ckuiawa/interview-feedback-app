
import 'whatwg-fetch';
import MockData from '../mockData/MockReviews'
import moment from 'moment';
import * as SortField from '../components/container/Constants';

class ReviewService {

  constructor() {

    this.API_VERSION = '5.4';
    this.PASS_KEY = 'kuy3zj9pr3n7i0wxajrzj04xo';
    this.BASE_URL = 'http://stg.api.bazaarvoice.com/data/reviews.json';

    this.compareDateAsc = this.compareDateAsc.bind(this);
    this.compareDateDsc = this.compareDateDsc.bind(this);
    this.compareRatingAsc = this.compareRatingAsc.bind(this);
    this.compareRatingDsc = this.compareRatingDsc.bind(this);
    this.getCompareFunc = this.getCompareFunc.bind(this);

    this.MaxLengthForTest = MockData.Results.length;
  }

  // Used for offline mode
  compareDateAsc(first, second) {
    const diff = moment(second.LastModificationTime) - moment(first.LastModificationTime);
    return diff;
  }

  // Used for offline mode
  compareDateDsc(first, second) {
    const diff = moment(first.LastModificationTime) - moment(second.LastModificationTime);
    return diff;
  }

  // Used for offline mode
  compareRatingAsc(first, second) {
    if (first.Rating < second.Rating) {
      return -1;
    }
    if (first.Rating > second.Rating) {
      return 1;
    }
    return 0;
  }

  // Used for offline mode
  compareRatingDsc(first, second) {
    if (first.Rating > second.Rating) {
      return -1;
    }
    if (first.Rating < second.Rating) {
      return 1;
    }
    return 0;
  }

  // Used for offline mode
  getCompareFunc(sortField, ascending) {
    if (sortField === SortField.SORT_FIELD_RATING && ascending) {
      return this.compareRatingAsc;
    }
    if (sortField === SortField.SORT_FIELD_RATING && !ascending) {
      return this.compareRatingDsc;
    }
    if (sortField === SortField.SORT_FIELD_DATE  && ascending) {
      return this.comparedDateAsc;
    }
    if (sortField === SortField.SORT_FIELD_DATE && !ascending) {
      return this.compareDateDsc;
    }
  }

  getProductReviewCount(productId) {
      return this.MaxLengthForTest;
  }


  getProductReviews(productId, sortField, ascending, index, numToRetrieve) {

      /**
       * Again, a perfect place where, given more time, I would have
       * figured out a more efficient way to do this.  Or at least one
       * that is prettier than this.
       */

      const result = [];

      const compareFunc = this.getCompareFunc(sortField, ascending);

      /*
        I didn't want to modify the contents of MockData.Results.
        So I want to copy the array.  I tried a number of standard
        Array calls to copy the array, but every one modified the
        original array.
       */
      const sorted = [];
      let count = 0;
      MockData.Results.forEach( item => {

        sorted.push(item);
        count++;
      });
      sorted.sort(compareFunc);

      let endOfLoop = numToRetrieve + index;
      for (let i=index; i<endOfLoop; i++) {

        if (i < this.MaxLengthForTest) {
          if (i < sorted.length) {
            sorted[i].kuiawa = i;
            result.push(sorted[i]);

          }
        }

      }
      return result;
    }
}

export default ReviewService;
