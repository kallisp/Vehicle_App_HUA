import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'

class SignUpControl extends React.Component {

    signUp() {
        //TODO FETCH POST
        this.props.history.push('/citizen-applications')
    }

    render() {
        return (
            <Base>
                <h4 className='text-center'>Εγγραφή</h4>
                <div className='container-row'>
                    <div className='container-col'>
                        <form className='signUpForm'>
                            <label for="fname">Όνομα</label>
                            <input type="text" id="fname" name="fname" value="" /><br />
                            <label for="lname">Επώνυμο</label>
                            <input type="text" id="lname" name="lname" value="" /><br />
                            <label for="sellerRegistrationCode">ΑΦΜ</label>
                            <input type="text" id="sellerRegistrationCode" name="sellerRegistrationCode" value="" /><br />
                        </form>
                    </div>
                    <div className='container-col'>
                        <form className='signUpForm'>
                            <label for="username">Όνομα χρήστη</label>
                            <input type="text" id="username" name="username" value="" /><br />
                            <label for="password">Κωδικός πρόσβασης</label>
                            <input type="text" id="password" name="password" value="" /><br />
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" value="" /><br />
                        </form>
                    </div>

                </div>
                <div className='container-row'>
                    <input className='button-signup' type="submit" value="Εγγραφή στην υπηρεσία" onClick={this.signUp.bind(this)} />
                </div>
            </Base>
        )
    }
}

export default withRouter(SignUpControl);