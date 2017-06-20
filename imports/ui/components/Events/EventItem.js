import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import moment from 'moment';

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
import { detailedUsersPrice, totalPrice } from '../../../utils/order-result';
import { updateEvent } from '../../../api/events/methods';
import OrdersTable   from '../Tables/OrdersTable';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';


const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;


class EventItem extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
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

            updateEvent.call(updatedEvent,
                handleResult(
                    () => this.prepareOrdersResultAndSendEmail(status)
                )
            );//Update event and send email with orders result
        };
    }

    prepareOrdersResultAndSendEmail(eventStatus) {
        const userEmail = Meteor.user().emails[0].address;
        const { orders, users, food, event } = this.props;
        let emailBody = null;

        switch (eventStatus) {
            case 'ordered':
                emailBody = <OrdersTable
                    orders={detailedUsersPrice(orders, users, food, event)}
                    totalPrice={+totalPrice(orders, food, event)}
                />;

                this.sendEmail(userEmail, eventStatus, emailBody);// Send email to event owner with detailed orders and price
                break;

            case 'delivered':
                const usersOrders = detailedUsersPrice(orders, users, food, event);
                emailBody = <OrdersTable
                    orders={usersOrders}
                    totalPrice={+totalPrice(orders, food, event)}
                />;

                usersOrders.forEach((order) => {
                    const body = <OrdersTable
                        orders={[order]}
                    />;
                    this.sendEmail(order.email, event.title, eventStatus, body);//Send email to each ordered user
                });
                break;
        }
    }

    sendEmail(from, eventName, status, emailBody) {
        Meteor.call('sendEmail',
            from,
            `Pizza DAY "${eventName}": ${status}`,
            ReactDOMServer.renderToStaticMarkup(emailBody)
        );
    };


    render() {
        const {event} = this.props
        const canEdit = event.createdBy === Meteor.userId();
        const canOrder = event.status === 'ordering';
        const isEventOver = event.status === 'delivered';

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
                            {canOrder && (
                                <LinkButton
                                    flat
                                    to={`/order/${event._id}`}
                                    label="Order"
                                />
                            )}

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
                                {canEdit && !isEventOver && (<MenuButtonStatus onSelect={this.onChangeStatus} eventId={event._id} />)}
                            </ListItem>
                        </List>

                    </CardActions>
                </Card>
            </Col>
        );

    }


}


EventItem.propTypes = {
    event: PropTypes.object.isRequired,
    onUnmount: PropTypes.func.isRequired,
    users: PropTypes.array,
    order: PropTypes.array,
    food: PropTypes.array,
};


export default EventItem;