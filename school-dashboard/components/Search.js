import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useState } from 'react';
import { capitalizeFirstLetter, UserTypeDisplay } from '../lib/nameUtils';
import { useGQLQuery } from '../lib/useGqlQuery';
import QuickPbisButton from './PBIS/QuickPbisButton';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { useUser } from './User';

// const SEARCH_USERS_QUERY = gql`
//   query SEARCH_USERS_QUERY($searchTerm: String!) {
//     searchTerms: allUsers(where: { AND: [{ name_contains_i: $searchTerm }] }) {
//       id
//       name
//       isStaff
//       isParent
//       isStudent
//     }
//   }
// `;

export const SEARCH_ALL_USERS_QUERY = gql`
  query SEARCH_ALL_USERS_QUERY {
    allUsers {
      id
      name
      isStaff
      isParent
      isStudent
    }
  }
`;

export default function Search() {
  const me = useUser();
  const router = useRouter();
  const { data: allUsers, isLoading } = useGQLQuery(
    'allUsers',
    SEARCH_ALL_USERS_QUERY,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );

  // const [findItems, { loading, data, error }] = useLazyQuery(
  //   SEARCH_USERS_QUERY,
  //   {
  //     fetchPolicy: 'no-cache',
  //   }
  // );

  const [usersToDisplay, setUsersToDisplay] = useState([]);

  const items = usersToDisplay;

  const filterUsers = (inputValue) => {
    if (inputValue === '') {
      setUsersToDisplay([]);

      return;
    }
    const itemsToShow = allUsers?.allUsers.filter((user) =>
      user.name.toLowerCase().includes(inputValue?.toLowerCase())
    );
    const eightItems = itemsToShow?.slice(0, 8);
    setUsersToDisplay(eightItems || []);
  };

  const allUsersWithoutRole = allUsers?.allUsers.filter(
    (user) => !user.isStaff && !user.isParent && !user.isStudent
  );
  if (allUsersWithoutRole?.length > 0) {
    console.log(allUsersWithoutRole);
  }

  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      filterUsers(inputValue);
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/userProfile/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for a User',
            id: 'search',
            className: isLoading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
            const { isStudent } = item;
            // console.log(item);
            return (
              <DropDownItem
                {...getItemProps({ item, index })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                {UserTypeDisplay(item)} {capitalizeFirstLetter(item.name)}
              </DropDownItem>
            );
          })}
        {isOpen && !items.length && !isLoading && (
          <DropDownItem>Sorry, No users found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
