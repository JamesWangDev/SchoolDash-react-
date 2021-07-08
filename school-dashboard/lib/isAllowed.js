import { useUser } from '../components/User';

export default function isAllowed(me, permission) {
  if (!me) return false;
  const allowed = me[permission];
  return !!allowed;
}
