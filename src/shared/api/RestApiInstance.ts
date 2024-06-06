import RestApiClient from './RestApiClient';
import { provideApiMethods } from './provideApiMethods';

const restApiClient = new RestApiClient();
const restApiInstance = restApiClient.client;
const restApiMethods = provideApiMethods(restApiInstance);

export { restApiClient, restApiInstance, restApiMethods };
