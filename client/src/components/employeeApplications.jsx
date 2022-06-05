import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'
import EmployeeMenu from './employeeMenu'
import superagent from 'superagent';
import withToast from './toaster';
import config from '../config';

class EmployeeApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: []
        }
    }

    componentDidMount() {
        superagent.get(`${config.apiURL}/api/applications/findApplicationByStatus`)
            .set('accept', 'json')
            .end((err, res) => {
                // if (err) {
                //     return this.props.addToast(err.message, { appearance: 'error', autoDismiss: true });
                // }
                this.setState({ applications: res.body });
            });
    }


    render() {
        return (
            <Base>
                <h4>Επιλογές υπαλλήλου</h4>
                <div className='container-row'>
                    <div className='container-col-30'>
                        <EmployeeMenu />
                    </div>
                    <div className='container-col-70'>
                        {(this.state.applications.length === 0) &&
                            <p>Δεν υπάρχουν αιτήσεις σε εκκρεμότητα</p>
                        }

                        {(this.state.applications.length > 0) &&
                            <div>
                                <div className='editApplicationHeader'><b>Αιτήσεις σε εκκρεμότητα</b></div>
                                <p>Ελέγξτε την ορθότητα των παρακάτω αιτήσεων:</p>
                                <table className='tableEmployee' style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr>
                                            <th>Ημ/νία αίτησης</th>
                                            <th>Αριθμός κυκλοφορίας</th>
                                            <th>Κατηγορία οχήματος</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.applications.map((application) => {
                                            return <tr key={application.applicationId}>
                                                <td>{new Date(application.dateCreated).toDateString()}</td>
                                                <td>{application.vehicleNum}</td>
                                                <td>{application.vehicleType}</td>
                                                <td><NavLink className="nav-link" to={`/employee-application-edit/${application.applicationId}`}>Προβολή</NavLink></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </Base>
        )
    }
}

export default withToast(withRouter(EmployeeApplications));