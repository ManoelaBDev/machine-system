import * as schemas from './schemas';
import { SchemaToRequest } from '../../../types/request';

/**
 * Request types for plant controllers
 */
export type GetRequest = SchemaToRequest<typeof schemas.get>; 