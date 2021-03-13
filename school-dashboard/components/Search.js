import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import QuickPbisButton from './PBIS/QuickPbisButton';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    searchTerms: allUsers(where: { name_contains_i: $searchTerm }) {
      id
      name
      role {
        name
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);
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
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
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
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
            const isStudent = item.role.some((role) => role.name === 'student');
            return (
              <DropDownItem
                {...getItemProps({ item })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                {item.name}
                {isStudent && <QuickPbisButton id={item.id} />}
              </DropDownItem>
            );
          })}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No users found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
