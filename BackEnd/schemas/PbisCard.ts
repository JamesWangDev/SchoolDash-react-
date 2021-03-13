import { integer, select, text, relationship, timestamp, checkbox, } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';
import { CalendarDay } from '@keystonejs/fields'

export const PbisCard = list({
    access: {
        create: isSignedIn,
        read: () => true,
        // update: rules.canManageCalendar,
        // delete: rules.canManageCalendar,
    },
    fields: {
        category: text(),
        cardMessage: text({
            ui: {
                displayMode: 'textarea',
            },
        }),

        student: relationship({
            ref: 'User.studentPbisCards',
        }),
        teacher: relationship({
            ref: 'User.teacherPbisCards',
        }),
        dateGiven: timestamp({
            isRequired: true,
            defaultValue: () => {
                const date = new Date();
                return date.toISOString();
            }
        }),
        counted: checkbox({ defaultValue: false, isRequired: true, label: 'Counted' }),
    },
});
