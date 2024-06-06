import { useMutation } from '@tanstack/react-query';

import { restApiMethods } from '../../../shared/api';

import { ResultsRequestData } from './types';

import * as constants from './constants';

const getResults = (data: ResultsRequestData): Promise<any> => {
  return restApiMethods.post(constants.urls.results, { ...data });
};

export const useResultsQuery = () => {
  const { mutateAsync, isLoading, isError } = useMutation(getResults, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useGetResults: mutateAsync,
    isLoading,
    isError,
  };
};
