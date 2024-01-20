
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import signin from './Component/SignIn/SignInForm.js';
import signup from './Component/SignUp/SignUpForm.js';
import forgotpassword from './Component/ForgotPassword/ForgotPasswordForm.js';
import resetpassword from './Component/ResetPassword/ResetPasswordForm.js';
import splash from './Component/Splash/Splash.js';
import createprofile from './Component/CreateProfile/CreateProfileForm';
import dashboard from './Component/Dashboard/Dashboard.js';
import changepassword from './Component/ChangePassword/ChangePasswordPage.js';
import consultation from './Component/ConsultationPage/ConsultationPage.js'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../src/redux/rootReducer";
// import * as serviceWorker from "./serviceWorker";

let store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
<BrowserRouter>

    <Switch>
    HomePage
    <Route path='/splash' component={splash} />
        <Route path='/signin' component={signin} />
        <Route path='/signup' component={signup} />
        <Route path='/forgotpassword' component={forgotpassword} />
        <Route path='/resetpassword' component={resetpassword} />
        <Route path='/createprofile' component={createprofile} />
        <Route path='/dashboard' component={dashboard} />
        {/* <Route path='/changepassword' component={changepassword} /> */}

        {/* <Route path='/myclinicspage' component={myclinicspage} /> */}
        {/* <Route path='/consultation' component={consultation} /> */}
        <Route path='' render={() => (<Redirect to="/splash" />)} />
    </Switch>
</BrowserRouter>
</Provider>

       


, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.register();