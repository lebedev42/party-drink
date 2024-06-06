import { useMutation } from '@tanstack/react-query';
import { restApiMethods } from '../../../shared/api';

import * as constants from './constants';
import { LivesData } from './types';

const sendLives = (data: LivesData): Promise<any> =>
  restApiMethods.post(constants.urls.lives, { ...data });

export const useLivesMutation = () => {
  const { mutate, data } = useMutation(sendLives, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useSendLives: mutate,
    data,
  };
};
