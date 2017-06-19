import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Email} from 'meteor/email'


Meteor.methods({
    sendEmail: function (to, subject, text) {
        // Make sure that all arguments are strings.
        check([to, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        // Don’t allow sending email not logged in users
        if (!Meteor.user()) {
            throw new Meteor.Error(403, 'not logged in');
        }

        Email.send({
            to: to,
            from: Meteor.user().emails[0].address,
            subject: subject,
            html: text,
        });
    }
});