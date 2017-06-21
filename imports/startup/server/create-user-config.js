import { Gravatar } from 'meteor/jparker:gravatar';

Accounts.onCreateUser(function (options, user) {
    var attachData, email, picture, profileImageUrl, profilePicture, url, service, allEmails, firstEmail;
    profileImageUrl = undefined;
    user.profile = user.profile || {};

    //If the google service exists
    if ((service = user.services) !== undefined ? service.google : undefined) {
        user.emails = [{address: user.services.google.email, verified: true}];
        user.profile.firstName = user.services.google.given_name;
        user.profile.lastName = user.services.google.family_name;
        user.avatar = user.services.google.picture;
        user.username = user.services.google.given_name;
    }

    //No avatar defined from Google service? Okay let's get a Gravatar
    if (!user.avatar) {
        email = ((allEmails = user.emails) !== undefined ? (firstEmail = allEmails[0]) !== undefined ? firstEmail.address : undefined : undefined) || '';

        url = Gravatar.imageUrl(email);
        console.log(url)
        user.avatar = url;
    }
    return user;
});