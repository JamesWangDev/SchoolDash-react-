import { integer, select, text, relationship, timestamp, checkbox, } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

export const StudentFocus = list({
    access: {
        create: isSignedIn,
        read: () => true,
        // update: rules.canManageCalendar,
        // delete: rules.canManageCalendar,
    },
    fields: {

        comments: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        category: text(),
        student: relationship({
            ref: 'User.studentFocusStudent',
        }),
        teacher: relationship({
            ref: 'User.studentFocusTeacher',
        }),

        dateCreated: timestamp({
            isRequired: true,
            defaultValue: () => {
                const date = new Date();
                return date.toISOString();
            }
        }),

    },
});
