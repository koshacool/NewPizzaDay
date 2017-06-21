import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    ServiceConfiguration.configurations.remove({service: 'google'});
    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: '403253438904-qj33b32v4rd6vrofdtrtkjb87bit50tk.apps.googleusercontent.com',
        secret: 'eOsoxL7qvTwIcRrprP6043y1'
    });
});

