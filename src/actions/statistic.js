import { ASYNC } from 'redux-amr';
import { customFetch } from '../utils/utils';

export function loadStatistic() {
  return {
    [ASYNC]: {
      key: 'statistic',
      promise: () => customFetch('/statistic')
    }
  };
}
