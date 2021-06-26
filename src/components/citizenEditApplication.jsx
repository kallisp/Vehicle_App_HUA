import React from 'react';
import { withRouter } from 'react-router-dom';
import Base from '../index'
import CitizenMenu from './citizenMenu'

class EditApplication extends React.Component {
    constructor(props){
		super(props);
		this.state = {
            vehicleNum: null
        }
    }

    queryChanged (event){
        this.setState({vehicleNum:event.target.value})
    }

    async search() {
        const response = await fetch('applications.json');
        const applications = await response.json();

        const application = applications.find((application) => {
            if (this.state.vehicleNum === application.vehicleNum) {
                return application
            }
        })

        this.props.history.push(`/citizen-application/${application.appID}`)
    }

    render() {
        return (
            <Base>
                <h4>Επιλογές πολίτη</h4>
                <div className='container-row'>
                    <div className='container-col-30'>
                        <CitizenMenu />
                    </div>
                    <div className='container-col-70'>
                        <div className='editApplicationHeader'><b>Επεξεργασία αίτησης μεταβίβασης</b></div>
                        <p>Αναζητήστε μια υπάρχουσα αίτηση με τον αριθμό κυκλοφορίας του οχήματος</p>
                        <div className='search'>
                            <input type="text" className="searchTerm" placeholder="Αναζήτηση με αριθμό κυκλοφορίας" onChange={this.queryChanged.bind(this)}/>
                        </div><br />
                        <input className='button-application' type="submit" value="Αναζήτηση αίτησης" onClick={this.search.bind(this)}/>
                    </div>
                </div>
            </Base >
        )
    }
}

export default withRouter(EditApplication);