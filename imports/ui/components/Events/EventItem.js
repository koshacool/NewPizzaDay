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
import Avatar from 'react-md/lib/Avatars';

import { handleResult } from '../../../utils/client-utils';
import { detailedUsersPrice, totalPrice } from '../../../utils/order-result';
import { updateEvent } from '../../../api/events/methods';
import OrdersTable   from '../Tables/OrdersTable';
import Spinner from '../Spinner';

import LinkButton from '../LinkButton';
import MenuButtonStatus from '../MenuButton';

/**
 * Get comfortable information about the difference in dates
 *
 * @param {date} date
 * @return {string}
 */
const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();

/**
 *
 * @param {date} date
 * @return {string}
 */
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

    /**
     * Change event status and send email with info
     * about orders in this event
     *
     * @param {string} status
     * @param {string} eventId
     * @returns {Function}
     */
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

    /**
     * Prepare component with informations about users orders
     * and send email
     *
     * @param {string} eventStatus
     * @return {void}
     */
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

    /**
     * Create html element in server side
     * end send it by email
     *
     * @param {string} from
     * @param {string} eventName
     * @param {string} status
     * @param {object} emailBody
     */
    sendEmail(from, eventName, status, emailBody) {
        Meteor.call('sendEmail',
            from,
            `Pizza DAY "${eventName}": ${status}`,
            ReactDOMServer.renderToStaticMarkup(emailBody)
        );
    };


    render() {
        const { event, users, loading } = this.props;
        const canEdit = event.createdBy === Meteor.userId();
        const canOrder = event.status === 'ordering';
        const isEventOver = event.status === 'delivered';
        const owner = users.filter(user => user._id === event.createdBy)[0];

        return (
            <Col xs={12} className="m-b-20">
                <Spinner loading={loading}>
                    <Card>
                        <CardTitle
                            title={event.title}
                            subtitle={getTimeAgo(event.createdAt)}
                        />

                        {owner && (
                            <CardText>
                                <Avatar alt={owner.username} src={owner.avatar} iconSized/>
                                {` ${owner.username}`}
                            </CardText>
                        )}


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
                                    {canEdit && !isEventOver && (
                                        <MenuButtonStatus onSelect={this.onChangeStatus} eventId={event._id}/>)}
                                </ListItem>
                            </List>

                        </CardActions>
                    </Card>
                </Spinner>
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
    loading: PropTypes.bool.isRequired,
};


export default EventItem;