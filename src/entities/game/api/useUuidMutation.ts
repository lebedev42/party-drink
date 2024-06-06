import { useMutation } from '@tanstack/react-query';
import { restApiMethods } from '../../../shared/api';

import * as constants from './constants';
import { UuidData } from './types';

const sendUuid = (data: UuidData): Promise<any> =>
  restApiMethods.post(constants.urls.uuid, { ...data });

export const useUuidMutation = () => {
  const { mutate, data, isLoading, isError } = useMutation(sendUuid, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useSendUuid: mutate,
    data,
    isLoading,
    isError,
  };
};
