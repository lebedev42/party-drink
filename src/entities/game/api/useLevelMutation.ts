import { useMutation } from '@tanstack/react-query';
import { restApiMethods } from '../../../shared/api';

import * as constants from './constants';
import { LevelData } from './types';

const sendLevel = (data: LevelData): Promise<any> =>
  restApiMethods.post(constants.urls.level, { ...data });

export const useLevelMutation = () => {
  const { mutate, data } = useMutation(sendLevel, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useSendLevel: mutate,
    data,
  };
};
