import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {compose} from 'redux';

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

// Below code
// connect(mapStateToProps)(WithSpinner(CollectionsOverview))
// First WithSpinner(CollectionsOverview)---->>>> connect(mapStateToProps) --> isLoading
//  Below code is equal to "const CollectionsOverviewCOntainer =connect(mapStateToProps)(WithSpinner(CollectionsOverview))"

const CollectionsOverviewCOntainer = compose( // Compose is valid from right-to-left   IT MEANS first "WithSpinner" runs WithSpinner(CollectionsOverview) and then connect(mapStateToProps)(CollectionsOverview)
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewCOntainer;