import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import userIcon from '../images/add-user.svg';
import moreIcon from '../images/more.svg';

// import superagent from 'superagent';

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            open: false
        }
    }

    componentDidMount() {
        const user = sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        this.setState({ user: userObj })
    }

    logout() {
        sessionStorage.removeItem('user');
        this.props.history.push('/login');
    }

    render() {

        let username;

        if (this.state.user !== null) {
            username = this.state.user.username;

            return (
                <div className='userAccount'>
                    <div className='username-header'>
                        <div>{username}</div>
                        <div className='username-options' onClick={e=> this.setState({open: !this.state.open})}>
                            <img src={moreIcon} alt='logout' />
                        </div>
                        {this.state.open && 
                        <div className="username-menu">
                            <button onClick={this.logout.bind(this)}>Έξοδος</button>
                        </div>
                        }
                    </div>
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
