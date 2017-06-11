import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Food } from './food';


Meteor.publish('food.userList', function foodUserList() {
    if (!this.userId) {
        return this.ready();
    }

    return Food.find({createdBy: this.userId});
});