export default function getDisplayName(user) {
  if (!user) return "";
  const displayName = user.preferredName
    ? `${user.name} - (${user.preferredName})`
    : user.name;
  return displayName;
}
