import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageCalendar: checkbox({
    defaultValue: false,
    label: 'User can Update and delete any  Calendar Event',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  canManageLinks: checkbox({
    defaultValue: false,
    label: 'User can see and manage Links',
  }),
  canManageDiscipline: checkbox({
    defaultValue: false,
    label: 'User can see and manage Discipline Referrals',
  }),
  canSeeAllDiscipline: checkbox({
    defaultValue: false,
    label: 'User can see Referrals',
  }),
  canSeeAllTeacherEvents: checkbox({
    defaultValue: false,
    label: 'User can see TeacherEvents',
  }),
  canSeeStudentEvents: checkbox({
    defaultValue: false,
    label: 'User can see Student Events',
  }),
  canSeeOwnCallback: checkbox({
    defaultValue: false,
    label: 'User can see own callback',
  }),
  canSeeAllCallback: checkbox({
    defaultValue: false,
    label: 'User can see all callback',
  }),
  hasTA: checkbox({
    defaultValue: false,
    label: 'User has a TA',
  }),
  hasClasses: checkbox({
    defaultValue: false,
    label: 'User teaches classes',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
