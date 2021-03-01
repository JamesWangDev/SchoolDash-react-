import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, integer, timestamp } from '@keystone-next/fields';
import { isSignedIn, permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => true,
    read: isSignedIn,
    // update: rules.canManageUsers,
    // only people with the permission can delete themselves!
    // You can't delete yourself
    delete: permissions.canManageUsers,
  },
  ui: {
    // hide the backend UI from regular users
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true, isIndexed: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    taStudents: relationship({ ref: 'User.taTeacher', many: true }),
    taTeacher: relationship({ ref: 'User.taStudents', many: false }),
    parent: relationship({ ref: 'User.children', many: true }),
    children: relationship({ ref: 'User.parent', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    //classes
    block1Teacher: relationship({ ref: 'User.block1Students', many: false }),
    block1Students: relationship({ ref: 'User.block1Teacher', many: true }),
    block2Teacher: relationship({ ref: 'User.block2Students', many: false }),
    block2Students: relationship({ ref: 'User.block2Teacher', many: true }),
    block3Teacher: relationship({ ref: 'User.block3Students', many: false }),
    block3Students: relationship({ ref: 'User.block3Teacher', many: true }),
    block4Teacher: relationship({ ref: 'User.block4Students', many: false }),
    block4Students: relationship({ ref: 'User.block4Teacher', many: true }),
    block5Teacher: relationship({ ref: 'User.block5Students', many: false }),
    block5Students: relationship({ ref: 'User.block5Teacher', many: true }),

    // Important Info
    callbackCount: integer({ defaultValue: 0 }),
    PbisCardCount: integer({ defaultValue: 0 }),
    YearPbisCount: integer({ defaultValue: 0 }),
    teacherSubject: text({ defaultValue: undefined, }),
    taPbisCardCount: integer({ defaultValue: 0 }),

    // assignments
    block1Assignment: text({ defaultValue: 'Current Assignment for Block 1 goes here' }),
    block1AssignmentLastUpdated: timestamp(),
    block2Assignment: text({ defaultValue: 'Current Assignment for Block 2 goes here' }),
    block3Assignment: text({ defaultValue: 'Current Assignment for Block 3 goes here' }),
    block4Assignment: text({ defaultValue: 'Current Assignment for Block 4 goes here' }),
    block5Assignment: text({ defaultValue: 'Current Assignment for Block 5 goes here' }),

    //Todo add these schemas

    // callbackItems: relationship({ ref: 'Callback.Student' }),
    // callbackAssigned: relationship({ ref: 'Callback.teacher' }),
    // cellPhoneViolations: relationship({ ref: 'Cellphone.student' }),



  },
});
