import { integer, select, text, relationship, timestamp,  } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';
import {CalendarDay} from '@keystonejs/fields'
export const Calendar = list({
  // access: {
  //   create: isSignedIn,
  //   read: rules.canReadProducts,
  //   update: rules.canManageProducts,
  //   delete: rules.canManageProducts,
  // },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },

    }),
    
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    date: timestamp({
      isRequired: true
    }),
    author: relationship({
      ref: 'User',
      
    }),
    dateCreated: timestamp({
      isRequired: true,
      
    }),
  },
});
