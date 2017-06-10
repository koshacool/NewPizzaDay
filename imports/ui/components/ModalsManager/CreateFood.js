import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';

import { handleResult } from '../../../utils/client-utils';
import { createFood } from '../../../api/food/methods';

const getFieldValue = form => field => form[field].value || '';


class CreateFood extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        const getFormFieldValue = getFieldValue(event.target);

        const name = getFormFieldValue('name');
        const price = getFormFieldValue('price');
        const description = getFormFieldValue('price');

        const foodItem = {
            name,
            price,
            description,
        };
        
        createFood.call({ foodItem }, handleResult((eventId) => {
          this.props.hideModal();
        }));;
        
    }

    render() {
        const { hideModal } = this.props;
        return (
            
                <FocusContainer
                    focusOnMount
                    component="form"
                    className="md-grid"
                    onSubmit={this.handleSubmit}
                >
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
                        defaultValue={10}
                        errorText="You don't enter price"
                    />

                    <TextField
                        id="description"
                        label="Description"
                        placeholder="Description"
                        paddedBlock
                        rows={4}
                    />

                    <Button flat primary label="Cancel" className="md-cell--right" onClick={hideModal}/>
                    <Button flat primary label="Create" type="submit" className="md-cell--right" />
                </FocusContainer>
           
        )
    }
}

CreateFood.propTypes = {
    hideModal: PropTypes.func.isRequired,
};

export default CreateFood;