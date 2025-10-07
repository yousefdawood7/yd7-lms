import Avatar from "react-avatar";

export default function LetterAvatar({
  name,
  alt,
}: {
  name: string;
  alt?: string;
}) {
  return <Avatar size="70" name={name} maxInitials={1} alt={alt} />;
}
