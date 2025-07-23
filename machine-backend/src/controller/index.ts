import { Response, NextFunction } from 'express';
import * as PlantService from '../../../services/enterprise/plant';
import { GetRequest } from './types';
import { authEnterprise } from '../../../auth/enterprise';

/**
 * Get plants by enterprise ID
 */
export const get = async (req: GetRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { enterpriseId } = req.params;
    const { user } = req;

    await authEnterprise(
      { userId: user.id, enterpriseId },
      ["mify:plant:read"]
    );

    const data = await PlantService.get({ enterpriseId, userId: user.id });

    res.status(200).json({
      statusCode: 200,
      message: "Plantas encontradas com sucesso",
      data
    });
  } catch (error) {
    next(error);
  }
}; 