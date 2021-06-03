import { takeLatest, call, put, all } from "redux-saga/effects";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { fetchCollectionsFailure, fetchCollectionsSuccess } from "./shop.actions";

import ShopActionType from './shop.types';

export function* fetchCollectionsAsync(){
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);// 1 argu: funcrion     2nd argu: parameter of the function
        yield put(fetchCollectionsSuccess(collectionsMap)); // "put" dispatch an object that expact to have a payload
    } catch (error) {
        put(fetchCollectionsFailure(error.message))
    }

        // collectionRef.get().then(snapshot=>{
        //    const collectionsMap= convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionsSuccess(collectionsMap))

        // }).catch(error=> dispatch(fetchCollectionsFailure(error.message)))
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionType.FETCH_COLLECTIONS_START, fetchCollectionsAsync); //takeEvery >> run everything at a time
}

export function* shopSagas(){
    yield all([ call(fetchCollectionsStart)]);
}