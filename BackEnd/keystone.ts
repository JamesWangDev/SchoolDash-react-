import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Calendar } from './schemas/Calendar'
import { Role } from './schemas/Role'
import { Link } from './schemas/Link'
import { PbisCard } from './schemas/PbisCard'
import { PbisTeam } from './schemas/PbisTeam'
import { StudentFocus } from './schemas/StudentFocus'
import { CellPhoneViolation } from './schemas/CellPhoneViolation'
import 'dotenv/config';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';

const databaseURL =
  process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in inital roles here
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Calendar,
      Role,
      Link,
      PbisCard,
      PbisTeam,
      StudentFocus,
      CellPhoneViolation,
    }),
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) => {
        // console.log(session);
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: 'id name email',
    }),
  })
);