import GithubLogin from "@/features/auth/_components/providers/GithubLogin";
import GoogleLogin from "@/features/auth/_components/providers/GoogleLogin";

export default function OauthForm() {
  return (
    <div className="flex flex-col gap-y-3.5">
      <GoogleLogin />
      <GithubLogin />
    </div>
  );
}
