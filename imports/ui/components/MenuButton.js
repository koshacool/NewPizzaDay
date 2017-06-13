import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const styles = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
};

const MenuButtonStatus = ({ onSelect, eventId }) => (
    <MenuButton
        id="vert-menu"
        icon
        buttonChildren="more_vert"
        className="menu-example"
        tooltipLabel="Change status"

    >
        <ListItem primaryText="Ordering" onClick={onSelect('ordering', eventId)}/>
        <ListItem primaryText="Ordered" onClick={onSelect('ordered', eventId)}/>
        <ListItem primaryText="Delivering" onClick={onSelect('delivering', eventId)}/>
        <ListItem primaryText="Delivered" onClick={onSelect('delivered', eventId)}/>
    </MenuButton>
);

MenuButtonStatus.propTypes = {
    onSelect: PropTypes.func.isRequired,
    eventId: PropTypes.string.isRequired,
};

export default MenuButtonStatus;