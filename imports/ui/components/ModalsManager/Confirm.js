import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import Button from 'react-md/lib/Buttons';

/**
 * Display modal window with two
 * buttons for accept or reject action
 */
const Confirm = ({ hideModal, onConfirm }) => {
    return (
        <div>

            <Button flat primary label="Yes" className="md-cell--right" onClick={onConfirm} />
            <Button flat primary label="No"  className="md-cell--right" onClick={hideModal} />
        </div>
    );
};

Confirm.propTypes = {
    hideModal: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};


export default Confirm;