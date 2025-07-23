import * as repository from '../../../repository/postgres/plant/enterprise';
import { Get } from './types';

export const get = (args: Get.Args): Promise<any> => {
  const { enterpriseId, userId } = args;

  return repository.get({ enterpriseId, userId });
}