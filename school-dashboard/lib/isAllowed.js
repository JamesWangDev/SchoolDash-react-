import { useUser } from '../components/User';

export default function isAllowed(me, permission) {
  const allowed = me.role.some((role) => role.name === permission);
  return !!allowed;
}
