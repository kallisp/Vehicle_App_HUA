import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'

import superagent from 'superagent';

class SignUpControl extends React.Component {

    data = {
        "first_name": "",
        "last_name": "",
        "email": "",
        "username": "",
        "password": "",
        "role": "citizen",
        "position": "none",
        "registrationCode": ""
    }

    async signUp() {
        superagent.post('/users/addUser')
            .send(this.data) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {
                console.warn(err);
                console.log(res);
            });
    }

    setValue(event, property) {
        this.data[property] = event.target.value;
    }

    render() {
        return (
            <Base>
                <h4 className='text-center'>Εγγραφή</h4>
                <div className='container-row'>
                    <div className='container-col'>
                        <form className='signUpForm'>
                            <label for="fname">Όνομα</label>
                            <input type="text" id="fname" name="fname" onChange={(event) => this.setValue(event, 'first_name')} /><br />
                            <label for="lname">Επώνυμο</label>
                            <input type="text" id="lname" name="lname" onChange={(event) => this.setValue(event, 'last_name')} /><br />
                            <label for="sellerRegistrationCode">ΑΦΜ</label>
                            <input type="text" id="sellerRegistrationCode" name="sellerRegistrationCode" onChange={(event) => this.setValue(event, 'registrationCode')} /><br />
                        </form>
                    </div>
                    <div className='container-col'>
                        <form className='signUpForm'>
                            <label for="username">Όνομα χρήστη</label>
                            <input type="text" id="username" name="username" onChange={(event) => this.setValue(event, 'username')} /><br />
                            <label for="password">Κωδικός πρόσβασης</label>
                            <input type="password" id="password" name="password" onChange={(event) => this.setValue(event, 'password')} /><br />
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" onChange={(event) => this.setValue(event, 'email')} /><br />
                        </form>
                    </div>

                </div>
                <div className='container-row'>
                    <NavLink to="/login">
                        <input className='button-signup' type="submit" value="Εγγραφή στην υπηρεσία" onClick={this.signUp.bind(this)} />
                    </NavLink>
                </div>
            </Base>
        )
    }
}

export default withRouter(SignUpControl);