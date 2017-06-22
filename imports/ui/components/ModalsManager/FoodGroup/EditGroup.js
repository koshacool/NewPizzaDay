import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';

import { handleResult, valueInArray, ucFirst } from '../../../../utils/client-utils';
import { updateGroup, removeGroup } from '../../../../api/foodGroups/methods';
import EditGroupInfo from './EditGroupInfo';
import FoodItem from '../../Food/FoodItem';
import Spinner from '../../Spinner';

import ModalsManagerContainer from '../Containers/ModalsManagerContainer';

/**
 * Class display window for edit group
 */
class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalParams: null,
        };

        this.onGroupUpdate = this.onGroupUpdate.bind(this);
        this.onGroupRemove = this.onGroupRemove.bind(this);
        this.onFoodAvailableToggle = this.onFoodAvailableToggle.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.modal) {
            document.getElementById('EditFoodGroup').style.top = "50%";
        }
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    /**
     * Hide modal window whis open in this component
     * @return {void}
     */
    hideModal() {
        this.setState({
            modal: false,
        });
    }

    /**
     * Show modal window by name
     *
     * @param {string} name
     * @returns {Function}
     */
    showModal(name) {
        return (modalParams = null) => {
            this.setState({
                modal: ucFirst(name),
                modalParams,
            });

        }
    }

    /**
     * Display modal window to confirm remove this group
     * @returns {XML}
     */
    modalConfirm() {
        return (<ModalsManagerContainer
            modalName={this.state.modal}
            hideModal={this.hideModal}
            modalDescription="Are you sure?"
            onConfirm={this.onGroupRemove}
            modal={true}
        />);
    }

    /**
     * Update group by field and value in this field
     *
     * @param {string} field
     * @returns {Function}
     */
    onGroupUpdate(field) {
        return (value) => {
            const updatedGroup = {
                _id: this.props.groupId,
                partToUpdate: {[field]: value},
            };

            updateGroup.call(updatedGroup, handleResult());
        };
    }

    /**
     * Remove group
     *
     * @return {void}
     */
    onGroupRemove() {
        const {groupId, hideModal} = this.props;

        removeGroup.call({_id: groupId}, handleResult(() => {
            hideModal();
        }));
    }

    /**
     * Add or remove food item in this group
     * @param {string} userId
     *
     * @return [void}
     */
    onFoodAvailableToggle(foodId) {
        const {group} = this.props;
        let foodArray = group.food;

        const foodPosition = foodArray.indexOf(foodId);
        if (foodPosition === -1) {
            foodArray.push(foodId);
        } else {
            foodArray.splice(foodPosition, 1);
        }

        const updatedGroup = {
            _id: this.props.group._id,
            partToUpdate: {food: foodArray},
        };

        updateGroup.call(updatedGroup, handleResult());
    }


    render() {
        const { loading, hideModal, group, food } = this.props;
        const { modal, modalParams } = this.state;

        return (
            <Spinner loading={loading}>
                {group && <div>
                    <EditGroupInfo
                        group={group}
                        onGroupUpdate={this.onGroupUpdate}
                        onGroupRemove={this.showModal('confirm')}
                    />

                    <Button raised primary label="Close" className="md-cell--middle" onClick={hideModal}/>
                    <Divider />

                    <List>
                        <Subheader primaryText="Food list" primary/>

                        {food.length > 0 && food.map(foodItem => (
                            foodItem._id === Meteor.userId() ?
                                '' :
                                <FoodItem
                                    key={foodItem._id}
                                    foodItem={foodItem}
                                    onAvailableToggle={this.onFoodAvailableToggle}
                                    checked={valueInArray(group.food, foodItem._id)}
                                />
                        ))}
                    </List>
                </div> }

                {modal && this[`modal${modal}`](modalParams)}
            </Spinner>

        )
    }
}

EditGroup.propTypes = {
    hideModal: PropTypes.func.isRequired,
    food: PropTypes.array.isRequired,
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func.isRequired,
};

export default EditGroup;
