import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import moment from 'moment';
import { Meteor } from 'meteor/meteor';

import { Col } from 'react-flexbox-grid';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import CardActions from 'react-md/lib/Cards/CardActions';
import Button from 'react-md/lib/Buttons/Button';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import ListItem from 'react-md/lib/Lists/ListItem';
import List from 'react-md/lib/Lists/List';

import { handleResult } from '../../../utils/client-utils';
import { updateEvent } from '../../../api/events/methods';
import  Email  from '../Email/Email';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';


const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;

class EventItem extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.getOrder = this.getOrder.bind(this);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    onChangeStatus(status, eventId) {
        return () => {
            const updatedEvent = {
                _id: eventId,
                partToUpdate: {'status': status},
            };

            updateEvent.call(updatedEvent, handleResult(this.sendEmail));

        };
    }

    sendEmail() {
        const emailBody = <Email userName="koshacool" orders={this.getOrder()} totalPrice={1321} />;
        Meteor.call('sendEmail',
            'roman.kushytskyy@gmail.com',
            'Hello from Bob!',
            ReactDOMServer.renderToStaticMarkup(emailBody)
        );
    }

    getOrder() {
        return [
            {
                userName: 'kosha',
                order: [
                    {
                        name: 'Pizza',
                        count: 5,
                        price: 54
                    },
                    {
                        name: 'Cheese',
                        count: 1,
                        price: 74.23,
                    }
                ],
            },
        ];
    };

    detailedUsersPrice() {
        const {event, orders} = this.props;
        const confirmedOrders = this.getConfirmedOrders();

        confirmedOrders.map(order => {
            order.food.map();
        });

    }

    userPrice(userId, food, quantities, discounts) {

    }

    getConfirmedOrders() {
        const {orders} = this.props;
        return orders.filter(order => order.status);
    }

    render() {
        const {event} = this.props
        const canEdit = event.createdBy === Meteor.userId();

        return (
            <Col xs={12} className="m-b-20">
                <Card>
                    <CardTitle
                        title={event.title}
                        subtitle={getTimeAgo(event.createdAt)}
                    />

                    <CardText>
                        testatat
                    </CardText>

                    <CardActions>
                        <LinkButton
                            flat
                            to={`/order/${event._id}`}
                            label="Order"
                        />

                        {canEdit && (
                            <LinkButton
                                flat
                                to={`/event/${event._id}`}
                                label="Edit"
                            />
                        )}
                        <List className="md-cell--right">
                            <ListItem
                                primaryText={`Status: ${event.status}`}
                                active
                                threeLines
                            >
                                {canEdit && (<MenuButtonStatus onSelect={this.onChangeStatus} eventId={event._id}/>)}
                            </ListItem>
                        </List>

                    </CardActions>
                </Card>
            </Col>
        );

    }


}
;


EventItem.propTypes = {
    event: PropTypes.object.isRequired,
    orders: PropTypes.array.isRequired,

    onUnmount: PropTypes.func.isRequired,
};


export default EventItem;
