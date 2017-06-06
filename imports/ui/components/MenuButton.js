import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';

const styles = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
};


export default class MenuButtonStatus extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MenuButton
                id="vert-menu"
                icon
                buttonChildren="more_vert"
                className="menu-example"
                tooltipLabel="Change status"

            >
                <ListItem primaryText="Ordering"/>
                <ListItem primaryText="Ordered"/>
                <ListItem primaryText="Delivering"/>
                <ListItem primaryText="Delivered"/>
            </MenuButton>
        );
    }
}