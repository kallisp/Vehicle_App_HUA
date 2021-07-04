import React from 'react';
import { withRouter } from 'react-router-dom';
import Base from '../index'
import config from '../config';
import withToast from './toaster';

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

    async signUp(event) {
        event.preventDefault();
        superagent.post(`${config.apiURL}/api/users/addUser`)
            .send(this.data) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {
                console.warn(err);
                console.log(res);
                this.props.history.push('/login');
            });
    }

    setValue(event, property) {
        this.data[property] = event.target.value;
    }

    render() {
        return (
            <Base>
                <form className='signUpForm' onSubmit={this.signUp.bind(this)}>
                    <h4 className='text-center'>Εγγραφή</h4>
                    <div className='container-row'>
                        <div className='container-col container-pad'>
                            <label>Όνομα</label>
                            <input type="text" required id="fname" name="fname" onChange={(event) => this.setValue(event, 'first_name')} /><br />
                            <label>Επώνυμο</label>
                            <input type="text" required id="lname" name="lname" onChange={(event) => this.setValue(event, 'last_name')} /><br />
                            <label>ΑΦΜ</label>
                            <input type="text" pattern="[0-9]{9}" required id="sellerRegistrationCode" name="sellerRegistrationCode" onChange={(event) => this.setValue(event, 'registrationCode')} /><br />
                        </div>
                        <div className='container-col container-pad'>
                            <label>Όνομα χρήστη</label>
                            <input type="text" required id="username" name="username" onChange={(event) => this.setValue(event, 'username')} /><br />
                            <label>Κωδικός πρόσβασης</label>
                            <input type="password" required id="password" name="password" onChange={(event) => this.setValue(event, 'password')} /><br />
                            <label>Email</label>
                            <input type="email" required id="email" name="email" onChange={(event) => this.setValue(event, 'email')} /><br />
                        </div>
                    </div>
                    <div className='container-row'>
                        <input className='button-signup' type="submit" value="Εγγραφή στην υπηρεσία" />
                    </div>
                </form>
            </Base >
        )
    }
}

export default withToast(withRouter(SignUpControl));