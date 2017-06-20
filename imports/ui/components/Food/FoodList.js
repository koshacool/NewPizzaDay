import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';

import { handleResult, ucFirst, valueInArray } from '../../../utils/client-utils';
import { updateEvent } from '../../../api/events/methods';
import { createFoodGroup } from '../../../api/foodGroups/methods';

import FoodItem from './FoodItem';
import Spinner from '../Spinner';
import LinkButton from '../LinkButton';
import NoItems from '../NoItems';
import ModalsManagerContainer from '../ModalsManager/Containers/ModalsManagerContainer';

import List from 'react-md/lib/Lists/List';
import Subheader from 'react-md/lib/Subheaders';


class FoodList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modalParams: null,
        };

        this.modalCreateFood = this.modalCreateFood.bind(this);
        this.modalEditFood = this.modalEditFood.bind(this);
        this.onAvailableToggle = this.onAvailableToggle.bind(this);
        this.onDiscount = this.onDiscount.bind(this);
        this.modalEditFoodGroup = this.modalEditFoodGroup.bind(this);
        this.createGroup = this.createGroup.bind(this);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    hideModal() {
        this.setState({
            modal: false,
        });
    }

    showModal(name) {
      return (modalParams = null) =>  this.setState({
            modal: ucFirst(name),
            modalParams,
        });
    }

    modalCreateFood() {
        return (<ModalsManagerContainer
            modalName={this.state.modal}
            hideModal={this.hideModal}
            modalDescription="Create Menu Item"
            event={this.props.event}
            modal
        />);
    }

    modalEditFood(foodItem) {
        return (<ModalsManagerContainer
            modalName={this.state.modal}
            hideModal={this.hideModal}
            modalDescription="Edit Menu Item"
            event={this.props.event}        
            foodItem={foodItem}
            modal
        />);
    }


    modalFoodGroupsList() {
        return (<ModalsManagerContainer
            modalName={this.state.modal}
            hideModal={this.hideModal}
            modalDescription="Your Groups"
            event={this.props.event}
            editGroup={this.showModal('editFoodGroup')}
        />);
    }

    modalEditFoodGroup(groupId) {
        return (<ModalsManagerContainer
             modalName={this.state.modal}
             hideModal={this.hideModal}
             modalDescription="Edit Group"
             event={this.props.event}
             groupId={groupId}
             food={this.props.food}
             modal={true}
         />);
    }

    onDiscount(field, foodId) {
        return (value) => {
            let discount = this.props.event.discount;
            discount[foodId] = value;

            const updatedEvent = {
                _id: this.props.event._id,
                partToUpdate: {[field]: discount},
            };

            updateEvent.call(updatedEvent, handleResult());
        };
    }

    onAvailableToggle(foodId, isChecked) {
        const {event} = this.props;
        let foodArray = event.food;

        if (isChecked) {
            foodArray.push(foodId);
        } else {
            foodArray.splice(foodArray.indexOf(foodId), 1);
        }

        const updatedEvent = {
            _id: event._id,
            partToUpdate: {food: foodArray},
        };

        updateEvent.call(updatedEvent, handleResult());
    }

    createGroup() {
        createFoodGroup.call({ group: {} }, handleResult((groupId) => {           
            this.showModal('editFoodGroup')(groupId);
        }));
    }


    render() {
        const { loading, event, food } = this.props;
        const { modal, modalParams } = this.state;
         
        return (
            <Spinner loading={loading}>
                <Row className="m-b-20">
                    <Col >
                        <Button raised primary label="NEW FOOD" onClick={this.showModal('createFood')}/>
                        <Button raised primary label="NEW GROUP" onClick={this.createGroup}/>
                        <Button raised primary label="GROUPS" onClick={this.showModal('foodGroupsList')}/>
                    </Col>
                </Row>
                <Divider />
                <Row center="xs">
                    <Col xs={12} md={12} sm={12}>
                        {!loading && food.length === 0 && <NoItems text="You don't have any food"/>}

                        <List>
                            { food.length > 0 && <Subheader primaryText="Available MENU" primary/> }
                            <Divider />
                            {food.length > 0 && food.map(foodItem => (
                                <FoodItem
                                    key={foodItem._id}
                                    foodItem={foodItem}
                                    onAvailableToggle={this.onAvailableToggle}
                                    checked={valueInArray(event.food, foodItem._id)}
                                    discount={event.discount[foodItem._id] ? +event.discount[foodItem._id] : 0}
                                    onDiscount={this.onDiscount}
                                    onEdit={this.showModal('editFood')}
                                />

                            ))}
                        </List>

                    </Col>
                </Row>

                {modal && this[`modal${modal}`](modalParams)}
            </Spinner>
        );
    }
}

FoodList.propTypes = {
    loading: PropTypes.bool.isRequired,
    event: PropTypes.object.isRequired,
    food: PropTypes.array.isRequired,
    onUnmount: PropTypes.func.isRequired,
};

export default FoodList;