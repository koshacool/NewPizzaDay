import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../node_modules/react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import FocusContainer from '../../../../../node_modules/react-md/lib/Helpers/FocusContainer';

import { handleResult, getFieldValue } from '../../../../utils/client-utils';
import { updateFood } from '../../../../api/food/methods';

/**
 * Class for display modal window to edit food item
 */
class EditFood extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * When form submit, get values from form field,
     * and update food item with this values
     *
     * @param {object} event DOM event
     * @return {void}
     */
    handleSubmit(event){
        event.preventDefault();
        const { hideModal, foodItem } = this.props;

        const getFormFieldValue = getFieldValue(event.target);

        const name = getFormFieldValue('name');
        const price = +getFormFieldValue('price');
        const description = getFormFieldValue('price');

        const updatedFood = {
                _id: foodItem._id,
                partToUpdate: {
                    name,
                    price,
                    description,
                },
        };

            updateFood.call(updatedFood, handleResult(hideModal));
        
    }

    render() {
        const { hideModal, foodItem } = this.props;
        
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
                        defaultValue={foodItem.name}
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
                        step={1}
                        min={0}
                        pattern="^\d+(\.|\,)\d{2}"
                        required
                        type="number"
                        defaultValue={foodItem.price}
                        errorText="You don't enter price"
                    />

                    <TextField
                        id="description"
                        label="Description"
                        placeholder="Description"
                        paddedBlock
                        defaultValue={foodItem.description}
                        rows={4}
                    />

                    <Button flat primary label="Cancel" className="md-cell--right" onClick={hideModal}/>
                    <Button flat primary label="Save" type="submit" className="md-cell--right" />
                </FocusContainer>
           
        )
    }
}

EditFood.propTypes = {
    hideModal: PropTypes.func.isRequired,
    foodItem:  PropTypes.object.isRequired,
};

export default EditFood;