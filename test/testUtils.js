import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import { middlewares } from '../src/configureStore';
import rootReducer from '../src/reducers';

export const storeFactory = (initialState) => {
  const createStoreWithMiddleWare = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddleWare(rootReducer, initialState);
}

export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
};

export const checkProps = (component, props) => {
  const propError = checkPropTypes(component.propTypes, props, 'prop', component.name);
  expect(propError).toBeUndefined();
}