import React from 'react';
import {  NavLink, withRouter } from 'react-router-dom';
import userIcon from '../images/add-user.svg';
// import superagent from 'superagent';

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

    logout(){
        sessionStorage.removeItem('user');
        this.props.history.push('/login');
        // superagent.get('`http://localhost:8000/users/logoutUser')
    }

    render() {

        let username;

        if (this.state.user !== null) {
            username = this.state.user.username;

            return (
                <div className='userAccount'>
                <div className='username-header'>{username}</div>
                <button onClick={this.logout.bind(this)}>Έξοδος</button>
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

export default withRouter(UserAccount);
