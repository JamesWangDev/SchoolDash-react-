import React from 'react';

import { HomePage } from '@keystone-next/admin-ui/pages/HomePage';
import { gql } from '@keystone-next/admin-ui/apollo';

export default function Home() {
  return (
    <HomePage
      query={gql`
        query {
          keystone {
            adminMeta {
              lists {
                key
                fields {
                  path
                  createView {
                    fieldMode
                  }
                }
              }
            }
          }
          User: _allUsersMeta {
            count
          }
          Calendar: _allCalendarsMeta {
            count
          }
          Role: _allRolesMeta {
            count
          }
          Link: _allLinksMeta {
            count
          }
          PbisCard: _allPbisCardsMeta {
            count
          }
          PbisTeam: _allPbisTeamsMeta {
            count
          }
          StudentFocus: _allStudentFociMeta {
            count
          }
          CellPhoneViolation: _allCellPhoneViolationsMeta {
            count
          }
        }
      `}
    />
  );
}
