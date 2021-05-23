import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'

class LoginControl extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            username:"", 
            password:""
        }
    }

    async login(event) {
        event.preventDefault();
        try {
        // const user = await serviceAPI.loginUser(this.state.username,this.state.password)
        
        const response = await fetch('/user.json')

        const user = await response.json();

        sessionStorage.setItem('user', JSON.stringify(user));

        if (user.role == "citizen") {
            this.props.history.push('/citizen-applications')
        }
        else {
            this.props.history.push('/employee-applications')
        }
    } catch(error) {
        console.error();
    }
    }

    usernameChanged(event) {
        const username = event.target.value;
        this.setState({username:username})
    }

    passwordChanged(event) {
        const password = event.target.value;
        this.setState({password:password})
    }

    render() {
        return (
            <Base>
                <div className='container-col-login'>
                    <h4>Είσοδος</h4>
                    <form className='loginForm'>
                        <label for="username">Όνομα χρήστη</label>
                        <input type="text" id="username" name="username" onChange={this.usernameChanged.bind(this)}/><br />
                        <label for="password">Κωδικός πρόσβασης</label>
                        <input type="password" id="password" name="password" onChange={this.passwordChanged.bind(this)}/><br /><br />
                        <input className='button' type="submit" value="Είσοδος στην υπηρεσία" onClick={this.login.bind(this)}/><br />
                        <div className='text-center'>Δεν έχετε λογαριασμό;  
                        <NavLink to="/sign-up">
                        <u><b>Εγγραφή</b></u>
                        </NavLink>
                        </div>
                    </form>
                </div>
            </Base>
        );
    }
}

export default withRouter(LoginControl);