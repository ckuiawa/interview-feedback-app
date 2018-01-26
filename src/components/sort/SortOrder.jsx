
import React  from 'react';
import PropTypes from 'prop-types';
import * as SortField from '../container/Constants';

class SortOrder extends React.Component {

  render() {
    return (

      <div className="sort-order">
        <select className="sort-selection" name="sort-order-select" onChange={this.props.onSortOrderChanged}>
          <option className="sort-option" value={SortField.SORT_ORDER_HIGHEST}>Highest</option>
          <option className="sort-option" value={SortField.SORT_ORDER_LOWEST}>Lowest</option>
          <option className="sort-option" value={SortField.SORT_ORDER_OLDEST}>Oldest</option>
          <option className="sort-option" value={SortField.SORT_ORDER_NEWEST}>Newest</option>
        </select>
      </div>
    );
  }


}

SortOrder.propTypes = {
  onSortOrderChanged: PropTypes.func,
  sortOrder: PropTypes.string
}


export default SortOrder;
