import Link from "next/link";
import { FaHome } from "react-icons/fa";
import NavStyles from "../styles/NavStyles";
import { useUser } from "../User";
import SignIn from "../loginComponents/SignIn";
import isAllowed from "../../lib/isAllowed";
import MessagesCount from "../Messages/MessagesCount";
import { useRouter } from "next/router";

export default function Nav() {
  const me = useUser();
  const router = useRouter();

  // console.log("me",me);
  // check if path is /reset
  const isReset = router.pathname.includes("/reset");
  // console.log("isReset",isReset);
  if (isReset) {
    return null;
  }

  if (!me) {
    return <SignIn />;
  }
  return (
    <NavStyles>
      {true && (
        <>
          <Link legacyBehavior href="/">
            <a className="home">
              <FaHome />
            </a>
          </Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/links">Links</Link>
          <Link href="/pbis">PBIS</Link>
          {isAllowed(me, "hasTA") && <Link href={`/taPage/${me?.id}`}>TA</Link>}
          {isAllowed(me, "hasClasses") && (
            <Link href="/callback">Callback</Link>
          )}
          {isAllowed(me, "isStaff") && <Link href="/users">Users</Link>}
          {isAllowed(me, "isStaff") && (
            <Link href="/discipline">Discipline</Link>
          )}
          {isAllowed(me, "isStaff") && (
            <Link href="/studentFocus">Student Focus</Link>
          )}
          {isAllowed(me, "canHaveSpecialGroups") && (
            <Link href="/specialGroup">SpGroup</Link>
          )}
          {isAllowed(me, "isSuperAdmin") && (
            <Link href="/superUserSettings">⚙️</Link>
          )}
          {isAllowed(me, "canManagePbis") && <Link href="/birthdays">🧁</Link>}
        </>
      )}
    </NavStyles>
  );
}
