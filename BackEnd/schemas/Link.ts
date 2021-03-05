import { integer, select, text, relationship, timestamp, checkbox, } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';
import { CalendarDay } from '@keystonejs/fields'

export const Link = list({
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

        forTeachers: checkbox({
            defaultValue: () => true,
            label: 'Teachers can view',
        }),
        forStudents: checkbox({
            defaultValue: false,
            label: 'Students can view',
        }),
        forParents: checkbox({
            defaultValue: false,
            label: 'Parents can view',
        }),
        onHomePage: checkbox({
            defaultValue: false,
            label: 'Display on the home page'
        }),


        modifiedBy: relationship({
            ref: 'User',
        }),
        modified: timestamp({
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
