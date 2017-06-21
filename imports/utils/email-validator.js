/**
 * Pattern for check email address
 *
 * @type {object}
 */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Check email by pattern
 *
 * @param {string} email Email address
 *     
 * @return {bool} 
 */
export const validateEmail = (email) => EMAIL_REGEX.test(email);