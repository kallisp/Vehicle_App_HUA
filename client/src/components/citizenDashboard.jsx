import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'
import CitizenMenu from './citizenMenu'


class CitizenDashboard extends React.Component {
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

            let firstname;
            let lastname;
            let afm; 

            if (this.state.user !== null){
                firstname = this.state.user.first_name;
                lastname = this.state.user.last_name;
                afm = this.state.user.registrationcode;
            }

            return (
                <Base>
                    <h4>Επιλογές πολίτη</h4>
                    <div className='container-row'>
                        <div className='container-col-30'>
                            <CitizenMenu />
                        </div>
                        <div className='container-col-70'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th className='th-border' colSpan="2">Νέα αίτηση μεταβίβασης</th>
                                    </tr>
                                    <tr><td colSpan="2">Ελέγξτε για την ορθότητα των παρακάτω στοιχείων του δικαιούχου του οχήματος για τη νέα μεταβίβαση</td></tr>
                                    <tr>
                                        <td className='td-width-50'><b>Όνομα δικαιούχου</b></td>
                                        <td>{firstname}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Επώνυμο δικαιούχου</b></td>
                                        <td>{lastname}</td>
                                    </tr>
                                    <tr>
                                        <td><b>ΑΦΜ δικαιούχου</b></td>
                                        <td>{afm}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <NavLink to='/citizen-application/new'>
                                <input className='button-application' type="submit" value="Έναρξη" />
                            </NavLink>
                        </div>
                    </div>
                </Base >
            )
        }
    }

    export default withRouter(CitizenDashboard);