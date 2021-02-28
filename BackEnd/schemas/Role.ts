import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions } from '../access';
import { permissionFields } from './fields';

export const Role = list({
  access: {
    //todo this will need to be updated for production
    // create: permissions.canManageRoles,
    // read: permissions.canManageRoles,
    // update: permissions.canManageRoles,
    // delete: permissions.canManageRoles,
  },
  ui: {
    // hideCreate: (args) => !permissions.canManageRoles(args),
    // hideDelete: (args) => !permissions.canManageRoles(args),
    // isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role', // todo Add this to the User
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});
