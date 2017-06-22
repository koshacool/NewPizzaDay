import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    //Set configuration for google auth
    ServiceConfiguration.configurations.remove({service: 'google'});
    ServiceConfiguration.configurations.insert(Meteor.settings.private.GOOGLE_AUTH);
});

