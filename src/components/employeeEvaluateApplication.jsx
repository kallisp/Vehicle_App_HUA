import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, NavLink } from 'react-router-dom';
import Base from '../index'

class EvaluateApplication extends React.Component {
    constructor(props){
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

        this.setState({application:application})
    }

    render() {

        let sellerAFM;
        let vehicleNum;
        let buyerAFM;

        if (this.state.application !== null) {

            sellerAFM = this.state.application.sellerCode;
            vehicleNum = this.state.application.vehicleNum;
            buyerAFM = this.state.application.buyerCode;
        }

        return (
            <Base>
                <h4>Στοιχεία αίτησης</h4>
                <div className='container-row-end'>
                    <div className='container-col-60'>
                        <table>
                            <tbody>
                            <tr>
                                <td className='tableEmployee'>Όνομα δικαιούχου</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className='tableEmployee'>Επώνυμο δικαιούχου</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className='tableEmployee'>ΑΦΜ δικαιούχου</td>
                                <td>{sellerAFM}</td>
                            </tr>
                            <tr>
                                <td className='tableEmployee'>Κατηγορία οχήματος</td>
                                <td>{vehicleNum}</td>
                            </tr>
                            <tr>
                                <td className='tableEmployee'>Αριθμός κυκλοφορίας</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className='tableEmployee'>Ημερομηνία άδειας κυκλοφορίας</td>
                                <td></td>
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
                            <input className='button-evaluation' type="submit" value="Έγκριση" />
                            <input className='button-evaluation' type="submit" value="Απόρριψη" />
                        </div>
                    </div>
                </div>
            </Base>
        )
    }
}

export default withRouter(EvaluateApplication);