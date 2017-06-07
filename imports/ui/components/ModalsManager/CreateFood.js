import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

class CreateFood extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.target.length)
        event.target.map(i => console.log(i))
    }

    render() {
        const { hideModal } = this.props;
        return (
            <Dialog
                id="speedBoost"
                visible={true}
                title="Create new menu item"
                aria-labelledby="speedBoostDescription"
                modal
                actions={[{
            onClick: hideModal,
            primary: true,
            label: 'Cancel',
          }, {
            onClick: hideModal,
            primary: true,
            label: 'Create',
          }]}
            >

                <form onSubmit={this.handleSubmit} className="md-toolbar-relative">
                    <TextField
                        id="name"
                        label="Name"

                        placeholder="Name"
                        paddedBlock
                        required
                        errorText="You don't enter name"
                    />

                    <TextField
                        id="price"
                        placeholder="Price"
                        label="Price"
                        paddedBlock
                        step={0.01}
                        min={0}
                        pattern="^\d+(\.|\,)\d{2}"
                        required
                        type="number"
                        errorText="You don't enter price"
                    />

                    <TextField
                        id="description"
                        label="Description"
                        placeholder="Description"
                        paddedBlock
                        rows={4}
                    />

                    <Button flat primary label="Submit" type="submit" className="md-cell--right" />
                </form>
            </Dialog>
        )
    }
}

CreateFood.propTypes = {
    hideModal: PropTypes.func.isRequired,
};

export default CreateFood;