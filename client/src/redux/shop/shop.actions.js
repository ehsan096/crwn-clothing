import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import ShopActionType from './shop.types';

export const fetchCollectionsStart = ()=>({
    type: ShopActionType.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsFailure = errorMessage =>({
    type: ShopActionType.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})
export const fetchCollectionsSuccess = collectionsMap =>({
    type: ShopActionType.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsStartAsync = ()=>{
    return dispatch=>{
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot=>{
           const collectionsMap= convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap))

        }).catch(error=> dispatch(fetchCollectionsFailure(error.message)))
    }
}