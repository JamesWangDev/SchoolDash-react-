import { integer, select, text, relationship, timestamp, } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';
import { CalendarDay } from '@keystonejs/fields'

export const Calendar = list({
  access: {
    create: isSignedIn,
    read: () => true,
    // update: rules.canManageCalendar,
    // delete: rules.canManageCalendar,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },

    }),

    status: select({
      options: [
        { label: 'Teachers', value: 'Teachers' },
        { label: 'Students', value: 'Students' },
        { label: 'Both', value: 'Both' },
      ],
      defaultValue: 'Both',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    date: timestamp({
      isRequired: true,
      defaultValue: () => {
        const date = new Date();
        return date.toISOString();
      }
    }),
    author: relationship({
      ref: 'User',
    }),
    dateCreated: timestamp({
      isRequired: true,
      defaultValue: () => {
        const date = new Date();
        return date.toISOString();
      }
    }),
    link: text(),
    linkTitle: text(),
  },
});
