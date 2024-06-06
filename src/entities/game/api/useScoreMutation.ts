import { useMutation } from '@tanstack/react-query';
import { restApiMethods } from '../../../shared/api';

import * as constants from './constants';
import { PointsData } from './types';

const sendScore = (data: PointsData): Promise<any> =>
  restApiMethods.post(constants.urls.score, { ...data });

export const useScoreMutation = () => {
  const { mutateAsync, data } = useMutation(sendScore, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useSendScore: mutateAsync,
    data,
  };
};
