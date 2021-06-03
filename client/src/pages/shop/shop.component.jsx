import React ,{useEffect, lazy, Suspense}from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";


import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverviewCOntainer = lazy(()=>import ('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(()=>import ('../collection/collection.container'));


const ShopPage=({fetchCollectionsStart , match})=>{
    
   useEffect(()=>{
    fetchCollectionsStart();
   },[fetchCollectionsStart])
  
    return( // {Route} ,that we have imported above, auto pass the 3 component as props which are ("match", "location" and "history") 
    <div className='shop-page'>
        <Suspense fallback={<Spinner />}>
            <Route exact path={`${match.path}`} component={CollectionsOverviewCOntainer} />
            <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </Suspense>
    </div>
        
        );
}




const mapDispatchToProps = dispatch=>({
    fetchCollectionsStart: ()=> dispatch(fetchCollectionsStart())
})
        
export default connect(null, mapDispatchToProps)(ShopPage);