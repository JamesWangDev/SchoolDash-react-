import { integer, select, text, relationship, timestamp, checkbox, } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';
import { CalendarDay } from '@keystonejs/fields'

export const PbisTeam = list({
    access: {
        create: isSignedIn,
        read: () => true,
        // update: rules.canManageCalendar,
        // delete: rules.canManageCalendar,
    },
    fields: {

        teamName: text(),

        taTeacher: relationship({
            ref: 'User.taTeam',
            many: true,
        }),
        uncountedCards: integer({ defaultValue: 0 }),
        countedCards: integer({ defaultValue: 0 }),
        currentLevel: integer({ defaultValue: 0 }),
        numberOfStudents: integer(),
        averageCardsPerStudent: integer({ defaultValue: 0 }),


        dateModivied: timestamp({
            isRequired: true,
            defaultValue: () => {
                const date = new Date();
                return date.toISOString();
            }
        }),
        lastModifiedBy: relationship({ ref: 'User' })

    },
});
