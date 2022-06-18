import React from 'react';
import { withRouter, } from 'react-router-dom';
import Base from '../index'
import superagent from 'superagent';
import withToast from './toaster';
import config from '../config';

class EvaluateApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: null,
            url: null
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        superagent.get(`${config.apiURL}/api/applications/findApplicationById/${id}`)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    return this.props.addToast(err.message, { appearance: 'error', autoDismiss: true });
                }
                this.setState({ application: res.body })
                superagent.get(`${config.apiURL}/api/applications/retrieveRegistrationPaperURL/${res.body.sellerCode}`)
            		.set('accept', 'json')
            		.end((err, res) => {
                	if (err) {
                    	return this.props.addToast(err.message, { appearance: 'error', autoDismiss: true });
                }
                this.setState({ url: res.body.presignedGetObject })
            });
            });
    }

    approve() {
        this.updateStatus('Completed');
    }

    deny() {
        this.updateStatus('Rejected');
    }

    updateStatus(status) {
        superagent.put(`${config.apiURL}/api/applications/editApplicationStatus`)
            .send({
                applId: this.props.match.params.id,
                status
            })
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    return this.props.addToast(err.message, { appearance: 'error', autoDismiss: true });
                }
                this.props.addToast('Η αίτηση ενημερώθηκε επιτυχώς', { appearance: 'success', autoDismiss: true });
                this.props.history.push('/employee-applications')
            });
    }

    render() {

        const sellerAFM = this.state.application?.sellerCode;
        const vehicleNum = this.state.application?.vehicleNum;
        const buyerAFM = this.state.application?.buyerCode;
        const vehicleType = this.state.application?.vehicleType;
        const certificateDate = this.state.application?.certificateDate;
        const sellerFirstName = this.state.application?.sellerFirstName;
        const sellerLastName = this.state.application?.sellerLastName;
        const presignedURL = this.state.url;

        return (
            <Base>
                <h4>Στοιχεία αίτησης</h4>
                <div className='container-row-end'>
                    <div className='container-col-60'>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='tableEmployee'>Όνομα δικαιούχου</td>
                                    <td>{sellerFirstName}</td>
                                </tr>
                                <tr>
                                    <td className='tableEmployee'>Επώνυμο δικαιούχου</td>
                                    <td>{sellerLastName}</td>
                                </tr>
                                <tr>
                                    <td className='tableEmployee'>ΑΦΜ δικαιούχου</td>
                                    <td>{sellerAFM}</td>
                                </tr>
                                <tr>
                                    <td className='tableEmployee'>Κατηγορία οχήματος</td>
                                    <td>{vehicleType}</td>
                                </tr>
                                <tr>
                                    <td className='tableEmployee'>Αριθμός κυκλοφορίας</td>
                                    <td>{vehicleNum}</td>
                                </tr>
                                <tr>
                                    <td className='tableEmployee'>Ημερομηνία άδειας κυκλοφορίας</td>
                                    <td>{new Date(certificateDate).toDateString()}</td>
                                </tr>
                                <tr>
                                    <td className='tableEmployee'>Άδεια κυκλοφορίας</td>
                                    <td><a href={presignedURL}><i class="fa fa-download" aria-hidden="true"></i> Ανάκτηση αρχείου</a></td>
                                </tr>
                                <tr>
                                    <td className='tableEmployee'>ΑΦΜ αγοραστή</td>
                                    <td>{buyerAFM}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='container-col-40'>
                        <div className='container-row-flex-end'>
                            <input className='button-evaluation' onClick={this.approve.bind(this)} type="submit" value="Έγκριση" />
                            <input className='button-evaluation' onClick={this.deny.bind(this)} type="submit" value="Απόρριψη" />
                        </div>
                    </div>
                </div>
            </Base>
        )
    }
}

export default withToast(withRouter(EvaluateApplication));
