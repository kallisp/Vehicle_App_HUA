import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
import logoHeader from './images/gov_gr_logo.svg';
import logoFooter from './images/logo_footer.svg';
import userIcon from './images/add-user.svg';
import LoginControl from './components/loginControl'
import SignUpControl from './components/signUpControl'
import CitizenApplications from './components/citizenApplications'
import CreateNewApplication from './components/citizenApplication'
import EditApplication from './components/citizenEditApplication'
import EmployeeApplications from './components/employeeApplications'
import EvaluateApplication from './components/employeeEvaluateApplication'

class Base extends React.Component {
    render() {
        return (
            <div className="app">
                <div className='AppHeader'>
                    <img src={logoHeader} alt="Govgr" className='LogoHeader' />
                    <div>Μεταβιβάστε εύκολα και γρήγορα το όχημά σας</div>
                    <UserAccount />
                </div>
                <div className="containerBase">
                    {this.props.children}
                </div>
                <div className='AppFooter'>
                    <img src={logoFooter} alt="Govgr" className='LogoFooter' />
                </div>
            </div>
        )
    }
}

export default withRouter(Base);

class UserAccount extends React.Component {
    constructor(props){
		super(props);
		this.state = {
            user: null
        }
    }

    componentDidMount() {
        const user = sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        this.setState({user:userObj})
    }

    render() {

        let username;

        if (this.state.user !== null) {
            username = this.state.user.username;

            return (
                <div className='userAccount'>
                <div className='username-header'>{username}</div>
            </div>
            )
        }
        
        return (
            <NavLink to="/sign-up">
                <div className='userAccount'>
                    <img src={userIcon} alt="add-user" className='userIcon' />
                    <div>Εγγραφή</div>
                </div>
            </NavLink>
        )
    }
}

class App extends React.Component {

    render() {
        return (
            <></>
            // <Base>
            //     <UserAccount />
            //     <LoginControl />
            //     <SignUpControl />
            // </Base>

        );
    }
}

ReactDOM.render(
    // <App />,
    <Router handler={App}>
        {/* <Route component={App}> */}
        <Route exact path="/login" component={LoginControl} />
        <Route exact path="/sign-up" component={SignUpControl} />
        <Route exact path="/citizen-applications" component={CitizenApplications} />
        <Route exact path="/citizen-application/:id" component={CreateNewApplication} />
        <Route exact path="/citizen-application-edit" component={EditApplication} />
        <Route exact path="/employee-applications" component={EmployeeApplications} />
        <Route exact path="/employee-application-edit/:id" component={EvaluateApplication} />
        {/* </Route> */}
    </Router>,
    document.getElementById('root')
);



