import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'
import superagent from 'superagent';

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount() {
        const userObj = sessionStorage.getItem('user');
        if (userObj) {
            const user = JSON.parse(userObj);
            this.redirectPerRole(user);
        }
    }

    async login(event) {
        event.preventDefault();
        superagent.post('http://localhost:8000/users/loginUser')
            .send({
                username: this.state.username,
                password: this.state.password
            })
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    return alert(res.body.message);
                }
                const user = res.body;
                sessionStorage.setItem('user', JSON.stringify(user));
                this.redirectPerRole(user);

            });
    }

    redirectPerRole(user) {
        if (user.role === "citizen") {
            this.props.history.push('/citizen-dashboard')
        }
        else if (user.role === 'employee') {
            this.props.history.push('/employee-applications')
        } else {
            alert('invalid role')
        }
    }


    usernameChanged(event) {
        const username = event.target.value;
        this.setState({ username: username })
    }

    passwordChanged(event) {
        const password = event.target.value;
        this.setState({ password: password })
    }

    render() {
        return (
            <Base>
                <div className='container-col-login'>
                    <h4>Είσοδος</h4>
                    <form className='loginForm'>
                        <label for="username">Όνομα χρήστη</label>
                        <input type="text" id="username" name="username" onChange={this.usernameChanged.bind(this)} /><br />
                        <label for="password">Κωδικός πρόσβασης</label>
                        <input type="password" id="password" name="password" onChange={this.passwordChanged.bind(this)} /><br /><br />
                        <input className='button' type="submit" value="Είσοδος στην υπηρεσία" onClick={this.login.bind(this)} /><br />
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