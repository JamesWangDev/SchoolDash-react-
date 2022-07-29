import { useMemo } from "react";
import Link from "next/link";
import Table from "../Table";
import QuickPbisButton from "../PBIS/QuickPbisButton";

export default function ViewStudentTable({ users, title }) {
  const columns = useMemo(
    () => [
      {
        Header: title || "Students",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            Cell: ({ row }) => {
              const { name } = row.original;
              const nameWithFirstLetterUpperCase = name
                .split(" ")
                .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(" ");

              const { preferredName } = row.original;
              const nameToShow = preferredName
                ? `${nameWithFirstLetterUpperCase} - (${preferredName})`
                : nameWithFirstLetterUpperCase;
              return (
                <>
                  <Link href={`/userProfile/${row.original.id}`}>
                    {nameToShow}
                  </Link>
                  <QuickPbisButton id={row.original.id} />
                </>
              );
            },
          },

          {
            Header: "TA Teacher",
            accessor: "taTeacher.name",
            Cell: ({ row }) => {
              const showLink = !!row.original?.taTeacher?.id;
              //   console.log(showLink);
              if (showLink)
                return (
                  <Link href={`/userProfile/${row.original?.taTeacher?.id}`}>
                    {row.original?.taTeacher?.name}
                  </Link>
                );
              return null;
            },
          },

          {
            Header: "Weekly PBIS",
            accessor: "PbisCardCount",
          },
          {
            Header: "Yearly PBIS",
            accessor: "YearPbisCount",
          },
          {
            Header: "Individual PBIS Level",
            accessor: "individualPbisLevel",
          },
          {
            Header: "Callback",
            accessor: "callbackCount",
          },
          {
            Header: "Average days on callback",
            accessor: "averageTimeToCompleteCallback",
          },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <Table
        data={users || []}
        columns={columns}
        searchColumn="name"
        showSearch={false}
      />
    </div>
  );
}
