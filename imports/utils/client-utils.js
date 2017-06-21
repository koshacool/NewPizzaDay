import R from 'ramda';

import { showError } from './alerts';

/**
 * This function is callback for another function. It cat display error
 * and call function param with result
 *
 * @param {function} onSuccess Function for call if exist result
 * @param {object} error Object with a detailed description of the execution function error
 * @param {object} result 
 *     
 * @return {void} 
 */
export const handleResult = onSuccess => (error, result) => {
  if (error) {
    showError(error);//Display error
  } else if (R.is(Function, onSuccess)) {//Check type of onSucces == 'function'
    onSuccess(result); //Call recieved function with result
  }
};

/**
 * Make first char in the string to upper case
 *
 * @param {string} str 
 *     
 * @return {string} 
 */
export const ucFirst = str => str[0].toUpperCase() + str.slice(1);

/**
 * Check exist value in array
 *
 * @param {array} arr
 * @param {string} value 
 *     
 * @return {boolean} 
 */
export const valueInArray = (arr, value) => arr.indexOf(value) !== -1;

/**
 * Get value from form's field
 *
 * @param {object} form HTML form
 * @param {string} field Form's field name to get value from it
 *     
 * @return {string} 
 */
export const getFieldValue = form => field => form[field].value || '';