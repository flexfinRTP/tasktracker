import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { ConnectedUsernameDisplay } from './UsernameDisplay'
import * as mutations from '../store/mutations';

const Navigation = ({ id, authenticated }) => (
    <div className="header">
        <Link to="/dashboard">
            <h1>
                Task Tracker 2.0
            </h1>
        </Link>

        { authenticated ?
            <h4>
                Hello, <ConnectedUsernameDisplay id={id} />!
            </h4>
            : null
        }
    </div>
);

const mapStateToProps = ({ session }) => ({
    id: session.id,
    authenticated: session.authenticated == mutations.AUTHENTICATED
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);