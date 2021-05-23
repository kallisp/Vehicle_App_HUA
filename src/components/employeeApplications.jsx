import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'
import EmployeeMenu from './employeeMenu'

class EmployeeApplications extends React.Component {
    constructor(props){
		super(props);
		this.state = {
            applications: []
        }
    }

    async componentDidMount() {

        const response = await fetch('/applications.json')

        const applications = await response.json();

        this.setState({applications:applications})
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
                        <div className='editApplicationHeader'><b>Αιτήσεις σε εκκρεμότητα</b></div>
                        <p>Ελέγξτε την ορθότητα των παρακάτω αιτήσεων:</p>
                        <table className='tableEmployee' style={{textAlign: 'center'}}>
                            <thead>
                                <tr>
                                    <th>Ημ/νία αίτησης</th>
                                    <th>Αριθμός κυκλοφορίας</th>
                                    <th>Κατηγορία οχήματος</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.applications.map((application)=>{
                                    return <tr key={application.appID}> 
                                        <td>{application.dateCreated}</td>
                                        <td>{application.vehicleNum}</td>
                                        <td>{application.status}</td>
                                        <td><NavLink to ={`/employee-application-edit/${application.appID}`}>Προβολή</NavLink></td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Base>
        )
    }
}

export default withRouter(EmployeeApplications);