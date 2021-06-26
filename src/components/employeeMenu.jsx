import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class EmployeeMenu extends React.Component {
    render() {
        return (
            <table className="menu">
                <tbody>
                    <tr>
                        <td>
                            <NavLink to='/employee-applications' activeClassName="active">
                                <div><b>Αιτήσεις σε εκκρεμότητα</b></div>Αξιολογείστε μία αίτηση μεταβίβασης
                            </NavLink>
                        </td>
                    </tr>
                    {/* <tr><td>
                        <NavLink to='/login' activeClassName="active">
                            <div><b>Ιστορικό αιτήσεων</b></div>Δείτε αιτήσεις που έχουν ολοκληρωθεί επιτυχώς
                        </NavLink>
                    </td>
                    </tr> */}
                </tbody>
            </table>
        )
    }
}

export default withRouter(EmployeeMenu);
