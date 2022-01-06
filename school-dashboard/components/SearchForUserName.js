import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    searchTerms: allUsers(where: { name_contains_i: $searchTerm }) {
      id
      name
      isStudent
      isParent
      isStaff
    }
  }
`;

export default function SearchForUserName({
  name,
  value,
  updateUser,
  userType,
}) {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items =
    data?.searchTerms.filter((item) =>
      userType ? item[userType] === true : true
    ) || [];

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
      console.log('clicked');
      // console.log(selectedItem);
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
            className: loading ? 'loading' : '',
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
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No users found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
