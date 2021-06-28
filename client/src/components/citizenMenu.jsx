import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class CitizenMenu extends React.Component {
    render() {
        return (
            <table className="menu">
                <tbody>
                    <tr>
                        <td>
                            <NavLink to='/citizen-dashboard' activeClassName="active">
                                <div><b>Νέα αίτηση μεταβίβασης</b></div>Ξεκινήστε τη διαδικασία για νέα μεταβίβαση
                            </NavLink>
                        </td>
                    </tr>
                    {/* <tr><td>
                        <NavLink to='/citizen-application-edit' activeClassName="active">
                          <div><b>Επεξεργασία αίτησης</b></div>Επεξεργαστείτε μια αίτηση μεταβίβασης
                        </NavLink>
                    </td></tr> */}
                    <tr><td>
                        <NavLink to='/citizen-applications' activeClassName="active">
                            <div><b>Ιστορικό αιτήσεων</b></div>Δείτε προηγούμενες μεταβιβάσεις και την κατάστασή τους
                        </NavLink>
                    </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default withRouter(CitizenMenu);
