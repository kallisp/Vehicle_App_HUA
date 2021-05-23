import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'

class CreateNewApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: null
        }
    }

    async componentDidMount() {

        const response = await fetch('/applications.json')

        const applications = await response.json();

        const application = applications.find((application) => {
            if (application.appID == this.props.match.params.id) {
                return application
            }
        }
        )
        this.setState({ application: application })
    }

    render() {

        if (this.state.application == null) {

        return (
            <Base>
                <h4>Νέα αίτηση μεταβίβασης</h4>
                <div className='container-row'>
                    <div className='container-col'>
                        <h5>Στοιχεία οχήματος</h5>
                        <form className='signUpForm'>
                            <label for="vehicleType">Κατηγορία οχήματος</label>
                            <input type="text" id="vehicleType" name="vehicleType" /><br />
                            <label for="regNumber">Αριθμός κυκλοφορίας</label>
                            <input type="text" id="regNumber" name="regNumber" /><br />
                            <label for="certificateDate">Ημερομηνία άδειας κυκλοφορίας</label>
                            <input type="text" id="certificateDate" name="certificateDate" /><br />
                        </form>
                    </div>
                    <div className='container-col'>
                        <h5>Στοιχεία αγοραστή</h5>
                        <form className='signUpForm'>
                            <label for="buyerRegistrationCode">ΑΦΜ</label>
                            <input type="text" id="buyerRegistrationCode" name="buyerRegistrationCode"/><br />
                        </form>
                    </div>

                </div>
                <div className='container-row'>
                    <input className='button-application' type="submit" value="Υποβολή" />
                </div>
            </Base>
        )
        } else {

        let vehicleNum;
        let buyerAFM;

        if (this.state.application !== null) {
            vehicleNum = this.state.application.vehicleNum;
            buyerAFM = this.state.application.buyerCode;

            return (
                <Base>
                    <h4>Επεξεργασία αίτησης μεταβίβασης</h4>
                    <div className='container-row'>
                        <div className='container-col'>
                            <h5>Στοιχεία οχήματος</h5>
                            <form className='signUpForm'>
                                <label for="vehicleType">Κατηγορία οχήματος</label>
                                <input type="text" id="vehicleType" name="vehicleType" value={vehicleNum} /><br />
                                <label for="regNumber">Αριθμός κυκλοφορίας</label>
                                <input type="text" id="regNumber" name="regNumber" /><br />
                                <label for="certificateDate">Ημερομηνία άδειας κυκλοφορίας</label>
                                <input type="text" id="certificateDate" name="certificateDate" /><br />
                            </form>
                        </div>
                        <div className='container-col'>
                            <h5>Στοιχεία αγοραστή</h5>
                            <form className='signUpForm'>
                                <label for="buyerRegistrationCode">ΑΦΜ</label>
                                <input type="text" id="buyerRegistrationCode" name="buyerRegistrationCode" value={buyerAFM} /><br />
                            </form>
                        </div>
                    </div>
                    <div className='container-row'>
                        <input className='button-application' type="submit" value="Υποβολή" />
                    </div>
                </Base>
            )
        }
        } 
    }
}

export default withRouter(CreateNewApplication);