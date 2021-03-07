import { useUser } from '../User';
import SignIn from '../loginComponents/SignIn';

export default function TaTeacherInfo() {
  const user = useUser();
  if (!user) return <SignIn />;
  return (
    <div>
      <h1>{user?.name}'s TA</h1>
    </div>
  );
}
