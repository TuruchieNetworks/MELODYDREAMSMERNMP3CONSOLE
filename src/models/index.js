// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Musicians } = initSchema(schema);

export {
  Musicians
};