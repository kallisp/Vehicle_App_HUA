import React from 'react';
import { withRouter } from 'react-router-dom';
import Base from '../index';
import superagent from 'superagent';
import withToast from './toaster';
import config from '../config';

class CreateNewApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: null,
            user: null,
            vehicle: {
                vehicleType: '',
                regNumber: '',
                certificateDate: ''
            },
            buyer: {
                buyerRegistrationCode: ''
            }
        }
    }

    async componentDidMount() {
        // get user
        const user = sessionStorage.getItem('user');
        const userObj = JSON.parse(user);
        this.setState({ user: userObj })

        // try to find application
        const id = this.props.match.params.id;
        if (id === 'new') { return; }

        superagent.get(`${config.apiURL}/api/applications/findApplicationById/${id}`)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    return this.props.addToast(err.message, { appearance: 'error', autoDismiss: true });
                }
                const cdate = new Date(res.body.certificateDate);
                const certificateDate = cdate && `${cdate.getFullYear()}-${cdate.getMonth() < 10 ? "0" + cdate.getMonth() : cdate.getMonth()}-${cdate.getDay() < 10 ? "0" + cdate.getDay() : cdate.getDay()}`;

                this.setState({
                    application: res.body,
                    vehicle: {
                        vehicleType: res.body.vehicleType,
                        regNumber: res.body.vehicleNum,
                        certificateDate
                    },
                    buyer: {
                        buyerRegistrationCode: res.body.buyerCode
                    }
                });
            });
    }

    createApplication(e) {
        e.preventDefault();
        superagent.post(`${config.apiURL}/api/applications/addApplication`)
            .send({
                vehicle_num: this.state.vehicle.regNumber,
                certif_date: this.state.vehicle.certificateDate,
                vehicle_type: this.state.vehicle.vehicleType,
                usr_id: this.state.user.id,
                seller_code: this.state.user.registrationcode,
                buyer_code: this.state.buyer.buyerRegistrationCode,
            })
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    return this.props.addToast(err.message, { appearance: 'error', autoDismiss: true });
                }
                this.props
                    .addToast(
                        'Η αίτησή σας βρίσκεται υπό επεξεργασία με κωδικό: ' + res.body.id,
                        { appearance: 'success', autoDismiss: true }
                    );

                this.props.history.push('/citizen-applications')
            });
    }

    updateApplication(e) {
        e.preventDefault();
        superagent.put(`${config.apiURL}/api/applications/editApplication`)
            .send({
                vehicle_num: this.state.vehicle.regNumber,
                certif_date: this.state.vehicle.certificateDate,
                vehicle_type: this.state.vehicle.vehicleType,
                usr_id: this.state.user.id,
                seller_code: this.state.user.registrationcode,
                buyer_code: this.state.buyer.buyerRegistrationCode,
                appl_id: this.state.application.applicationId
            })
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    return this.props.addToast(err.message, { appearance: 'error', autoDismiss: true });
                }
                this.props
                    .addToast(
                        'Η αίτησή σας βρίσκεται υπό επεξεργασία με κωδικό: ' + res.body.id,
                        { appearance: 'success', autoDismiss: true }
                    );
                this.props.history.push('/citizen-applications')
            });
    }

    setVehicleValue(event, property) {
        this.setState({
            vehicle: {
                ...this.state.vehicle,
                [property]: event.target.value
            }
        });
    }

    setBuyerValue(event, property) {
        this.setState({
            buyer: {
                [property]: event.target.value
            }
        });
    }

     get isCompleted(){
         return this.state.application?.status === 'Completed';
     }

    render() {
        const certificateDate = this.state.vehicle.certificateDate;
        const buyerCode = this.state.buyer.buyerRegistrationCode;
        const vehicleNum = this.state.vehicle.regNumber;
        const vehicleType = this.state.vehicle.vehicleType;

        return (
            <Base>

                <form className='signUpForm' onSubmit={e => !this.state.application
                    ? this.createApplication(e)
                    : this.updateApplication(e)}>

                    {!this.state.application &&
                        <h4>Νέα αίτηση μεταβίβασης</h4>
                    }
                    {this.state.application && !this.isCompleted &&
                        <h4>Επεξεργασία αίτησης μεταβίβασης</h4>
                    }
                    {this.isCompleted &&
                        <h4>Ολοκληρωμένη αίτησης μεταβίβασης</h4>
                    }
                    <div className='container-row'>
                        <div className='container-col container-pad'>
                            <h5>Στοιχεία οχήματος</h5>

                            <label for="vehicleType">Κατηγορία οχήματος</label>
                            <select disabled={this.isCompleted} required id="vehicleType" name="vehicleType" value={vehicleType} onChange={(event) => this.setVehicleValue(event, 'vehicleType')}>
                                <option value="">Επιλέξτε κατηγορία</option>
                                <option value="Car">Αυτοκίνητο</option>
                                <option value="Motorcycle">Μοτοσυκλέτα</option>
                                <option value="Truck">Φορτηγό</option>
                                <option value="Boat">Σκάφος</option>
                            </select>
                            <br />
                            <label for="regNumber">Αριθμός κυκλοφορίας</label>
                            <input disabled={this.isCompleted} required pattern="[A-Z]{3}[0-9]{4}" type="text" id="regNumber" name="regNumber" value={vehicleNum} onChange={(event) => this.setVehicleValue(event, 'regNumber')} /><br />
                            <label for="certificateDate">Ημερομηνία άδειας κυκλοφορίας</label>
                            <input disabled={this.isCompleted} required type="date" id="certificateDate" value={certificateDate} name="certificateDate" onChange={(event) => this.setVehicleValue(event, 'certificateDate')} /><br />

                        </div>
                        <div className='container-col container-pad'>
                            <h5>Στοιχεία αγοραστή</h5>
                            <label for="buyerRegistrationCode">ΑΦΜ</label>
                            <input disabled={this.isCompleted} required pattern="[0-9]{9}" type="text" id="buyerRegistrationCode" value={buyerCode} name="buyerRegistrationCode" onChange={(event) => this.setBuyerValue(event, 'buyerRegistrationCode')} /><br />
                        </div>

                    </div>
                    <div className='container-row'>
                        {!this.state.application &&
                            <input className='button-application' type="submit" value="Υποβολή" />
                        }
                        {this.state.application && !this.isCompleted &&
                            <input className='button-application' type="submit" value="Αποθήκευση" />
                        }
                    </div>
                </form>
            </Base>
        )
    }
}

export default withToast(withRouter(CreateNewApplication));