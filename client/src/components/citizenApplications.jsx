import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'
import CitizenMenu from './citizenMenu'
import superagent from 'superagent';


class CitizenApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: []
        }
    }

    componentDidMount() {
        let user;
        try {
            user = JSON.parse(sessionStorage.getItem('user'));
        } catch (ex) {
           return alert('user not found')
        }
        superagent.get(`/api/applications/findApplicationByUser/${user.id}`)
            .set('accept', 'json')
            .end((err, res) => {
                if (err){
                    return alert(err.message);
                }
                this.setState({applications: res.body});
            });
    }

    render() {
        return (
            <Base>
                <h4>Ιστορικό αιτήσεων</h4>
                <div className='container-row'>
                    <div className='container-col-30'>
                        <CitizenMenu />
                    </div>
                    <div className='container-col-70'>
                        {this.state.applications.length === 0 &&
                            <p> Δεν υπάρχουν αιτήσεις</p>
                        }

                        {this.state.applications.length > 0 &&
                            <table className='tableEmployee' style={{ textAlign: 'center' }}>
                                <thead>
                                    <tr>
                                        <th>Ημ/νία αίτησης</th>
                                        <th>Αριθμός κυκλοφορίας</th>
                                        <th>Κατάσταση αίτησης</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.applications.map((application) => {
                                        return <tr key={application.applicationId}>
                                            <td>{new Date(application.dateCreated).toDateString()}</td>
                                            <td>{application.vehicleNum}</td>
                                            <td>{application.status}</td>
                                            <td><NavLink className="nav-link" to={`/citizen-application/${application.applicationId}`}>Προβολή</NavLink></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </Base >
        )
    }
}

export default withRouter(CitizenApplications);