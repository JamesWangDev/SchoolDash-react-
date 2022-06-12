import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { capitalizeFirstLetter, UserTypeDisplay } from '../lib/nameUtils';
import { useGQLQuery } from '../lib/useGqlQuery';
import QuickPbisButton from './PBIS/QuickPbisButton';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { useUser } from './User';
import { commandPallettePaths } from '../lib/CommandPallettePaths';

const SEARCH_ALL_LINKS_QUERY = gql`
query GET_ALL_LINKS {
  links(where: { forTeachers: { equals: true } }) {
    id
    name
    description
    link
  }
}
`;


function formatUsers(users = []) {
  return users.map(user => {
    return {
      id: user.id,
      name: capitalizeFirstLetter(user.name),
      icon: UserTypeDisplay(user),
      path: `/userProfile/${user.id}`,
    };
  }
  );
}

function formatLinks(links = []) {
  return links.map(link => {
    // if path doesnt have http add it
    const formattedPath = link.link.startsWith('http') ? link.link : `http://${link.link}`;
    const nameAndDescription = `${link.name} - ${link.description}`;
    return {
      id: link.id,
      name: nameAndDescription,
      icon: '🔗',
      path: formattedPath,
    };
  }
  );
}
      

export const SEARCH_ALL_USERS_QUERY = gql`
  query SEARCH_ALL_USERS_QUERY {
    users {
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
  const { data: allLinks } = useGQLQuery(
    'searchLinks',
    SEARCH_ALL_LINKS_QUERY,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );
  
  

  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  // list of paths if staff
  const extraPaths = me?.isStaff ? commandPallettePaths : [];

  // memoized list of data to display
  const formatedItems = useMemo(() => {
    if (allUsers) {
      return [...formatUsers(allUsers?.users), ...extraPaths, ...formatLinks(allLinks?.links)];
    }
    return [];
  }
  , [allUsers, extraPaths, allLinks]);

  


  const items = itemsToDisplay;

  const filterUsers = (valueToFilter) => {
    if (valueToFilter === '') {
      setItemsToDisplay([]);

      return;
    }
    const itemsToShow = formatedItems.filter((user) =>
      user.name.toLowerCase().includes(valueToFilter?.toLowerCase())
    );
    const eightItems = itemsToShow?.slice(0, 8);
    setItemsToDisplay(eightItems || []);
  };

  // if in dev mode display users without role
  if (process.env.NODE_ENV !== 'production') {
    const allUsersWithoutRole = allUsers?.users.filter(
      (user) => !user.isStaff && !user.isParent && !user.isStudent
    );
    if (allUsersWithoutRole?.length > 0) {
      console.log("Users who dont have a role")
      console.log(allUsersWithoutRole);
    }
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
        pathname: selectedItem.path,
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
            placeholder: 'Search for anything...',
            id: 'search',
            className: isLoading ? 'loading' : '',
            tabIndex: 1,
            // autoFocus: true,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
           
            return (
              <DropDownItem
                {...getItemProps({ item, index })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                {item.icon} {item.name}
              </DropDownItem>
            );
          })}
        {isOpen && !items.length && !isLoading && (
          <DropDownItem>Sorry, Not found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
