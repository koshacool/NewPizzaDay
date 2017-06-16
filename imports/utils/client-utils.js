import R from 'ramda';

import { showError } from './alerts';


export const handleResult = onSuccess => (error, result) => {
  if (error) {
    showError(error);
  } else if (R.is(Function, onSuccess)) {
    onSuccess(result);
  }
};

export const ucFirst = str => str[0].toUpperCase() + str.slice(1);

export const valueInArray = (arr, value) => arr.indexOf(value) !== -1;

export const getFieldValue = form => field => form[field].value || '';
