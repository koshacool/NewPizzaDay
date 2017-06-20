import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Food } from './food';


Meteor.publish('food.userList', function foodUserList() {
    if (!this.userId) {
        return this.ready();
    }

    return Food.find({createdBy: this.userId});
});

Meteor.publish('food.byId', function foodById(foodId) {
    check(foodId, String);
    if (!this.userId) {
        return this.ready();
    }

    return Food.find({_id: foodId, createdBy: this.userId});
});

Meteor.publish('food.byArrayId', function foodByArrayId(arrayId) {
    check(arrayId, Array);

    if (!this.userId) {
        return this.ready();
    }

    return Food.find({ _id: { $in: arrayId } });
});