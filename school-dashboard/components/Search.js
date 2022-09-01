import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import { useRouter } from "next/dist/client/router";
import { useState, useMemo } from "react";
import { capitalizeFirstLetter, UserTypeDisplay } from "../lib/nameUtils";
import { useGQLQuery } from "../lib/useGqlQuery";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { useUser } from "./User";
import { commandPallettePaths } from "../lib/CommandPallettePaths";
import { GET_CALENDARS } from "./calendars/Calendars";
import getDisplayName from "../lib/displayName";

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
  return users.map((user) => {
    const name = capitalizeFirstLetter(getDisplayName(user));
    return {
      id: user.id,
      name: name,
      icon: UserTypeDisplay(user),
      path: `/userProfile/${user.id}`,
    };
  });
}

function formatLinks(links = []) {
  return links.map((link) => {
    // if path doesnt have http add it
    const formattedPath = link.link.startsWith("http")
      ? link.link
      : `http://${link.link}`;
    const nameAndDescription = `${link.name} - ${link.description}`;
    return {
      id: link.id,
      name: nameAndDescription,
      icon: "🔗",
      path: formattedPath,
    };
  });
}

function formatCalendars(calendars = []) {
  return calendars.map((calendar) => {
    const date = new Date(calendar.date).toLocaleDateString();
    const nameAndDescription = `${calendar.name} - ${date} - ${calendar.description}`;
    return {
      id: calendar.id,
      name: nameAndDescription,
      icon: "📅",
      path: `/calendarEvent/${calendar.id}`,
    };
  });
}

export const SEARCH_ALL_USERS_QUERY = gql`
  query SEARCH_ALL_USERS_QUERY {
    users {
      id
      name
      preferredName
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
    "allUsers",
    SEARCH_ALL_USERS_QUERY,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );
  const { data: allLinks } = useGQLQuery(
    "searchLinks",
    SEARCH_ALL_LINKS_QUERY,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );

  const { data: allCalendars } = useGQLQuery(
    "allCalendars",
    GET_CALENDARS,
    {},
    {
      enabled: !!me,
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );
  // console.log('allCalendars', allCalendars);

  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  // list of paths if staff
  const extraPaths = me?.isStaff ? commandPallettePaths : [];

  // memoized list of data to display
  const formatedItems = useMemo(() => {
    if (allUsers) {
      return [
        ...formatUsers(allUsers?.users),
        ...extraPaths,
        ...formatLinks(allLinks?.links),
        ...formatCalendars(allCalendars?.calendars),
      ];
    }
    return [];
  }, [allUsers, extraPaths, allLinks, allCalendars]);

  const items = itemsToDisplay;

  const filterUsers = (valueToFilter) => {
    if (valueToFilter === "") {
      setItemsToDisplay([]);
      // console.log('empty');
      return;
    }
    // console.log('valueToFilter', valueToFilter);
    const itemsToShow = formatedItems.filter((user) =>
      user.name.toLowerCase().includes(valueToFilter?.toLowerCase())
    );
    const eightItems = itemsToShow?.slice(0, 8);
    setItemsToDisplay(eightItems || []);
  };

  // if in dev mode display users without role
  if (process.env.NODE_ENV !== "production") {
    // console.log("dev");
    const allUsersWithoutRole = allUsers?.users.filter(
      (user) => !user.isStaff && !user.isParent && !user.isStudent
    );
    if (allUsersWithoutRole?.length > 0) {
      console.log("Users who dont have a role");
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
    reset,
  } = useCombobox({
    items,
    onInputValueChange(e) {
      filterUsers(e.inputValue);
    },
    onSelectedItemChange({ selectedItem }) {
      // if selected item.path is a relative path
      if (selectedItem?.path.startsWith("/")) {
        router.push(selectedItem?.path);
      }
      // if selected item.path is an absolute path
      if (selectedItem?.path.startsWith("http")) {
        window.open(selectedItem?.path);
      }
      // reset input value
      filterUsers("");
      reset();
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for anything...",
            id: "search",
            className: isLoading ? "loading" : "",
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
