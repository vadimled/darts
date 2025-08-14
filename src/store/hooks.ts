import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './index';
import { socketSliceAction } from './socketSlice';
import { bindActionCreators } from 'redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const actions = {
  ...socketSliceAction
};

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators(actions, dispatch);
};
