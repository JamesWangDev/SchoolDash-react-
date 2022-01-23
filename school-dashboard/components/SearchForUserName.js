import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { useGQLQuery } from '../lib/useGqlQuery';
import { useUser } from './User';

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

export default function SearchForUserName({
  name,
  value,
  updateUser,
  userType,
}) {
  const me = useUser();
  const [usersToDisplay, setUsersToDisplay] = useState([]);

  const { data: allUsers, isLoading } = useGQLQuery(
    'allUsers',
    SEARCH_ALL_USERS_QUERY,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );
  // console.log(userType);
  // console.log(usersToDisplay);
  const usersFilteredByType =
    allUsers?.allUsers?.filter((item) =>
      userType ? item[userType] === true : true
    ) || [];
  // console.log(usersFilteredByType);

  const items = usersToDisplay;
  const filterUsers = (valueToFilter) => {
    if (valueToFilter === '') {
      setUsersToDisplay([]);

      return;
    }
    const itemsToShow = usersFilteredByType.filter((user) =>
      user.name.toLowerCase().includes(valueToFilter?.toLowerCase())
    );
    const eightItems = itemsToShow?.slice(0, 8);
    setUsersToDisplay(eightItems || []);
  };

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
      console.log('clicked');
      console.log(selectedItem);
      updateUser({ userId: selectedItem.id, userName: selectedItem.name });
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
            id: name,
            name,
            className: isLoading ? 'loading' : '',
            // value,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
            const { isStudent } = item;
            return (
              <DropDownItem
                {...getItemProps({ item, index })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                {item.name}
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
