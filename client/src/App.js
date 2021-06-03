
import React ,{useEffect, lazy, Suspense}from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";
import { GlobalStyle } from "./global.styles";

const HomePage = lazy(()=>import ('./pages/homepage/homepage.component'))
const ContactUs = lazy(()=>import ('./pages/contactus/contactus.component'))
const Privacy = lazy(()=>import ('./pages/privacypage/privacy.component'))
const Refund = lazy(()=>import ('./pages/refundpage/refund.component'))
const Shipping = lazy(()=>import ('./pages/shippingpage/shipping.component'))
const Conditions = lazy(()=>import ('./pages/conditionspage/conditions.component'))
const ShopPage = lazy(()=>import ('./pages/shop/shop.component'))
const CheckoutPage = lazy(()=>import ('./pages/checkout/checkout.component'))
const SingInAndSignUpPage = lazy(()=>import ('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))


const App=({checkUserSession, currentUser})=>  {
  useEffect(()=>{
    checkUserSession()
  }, [checkUserSession]); 
 

  return (
    <div >
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/contact' component={ContactUs}/>
          <Route exact path='/privacy' component={Privacy}/>
          <Route exact path='/refund' component={Refund}/>
          <Route exact path='/shiping' component={Shipping}/>
          <Route exact path='/terms' component={Conditions}/>
          <Route exact path='/signin' render={()=>currentUser? (<Redirect to='/' />): <SingInAndSignUpPage />}/>
        </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch=>({
  checkUserSession: ()=>dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
