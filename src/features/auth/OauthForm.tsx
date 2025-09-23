import GithubLogin from "@/features/auth/providers/GithubLogin";
import GoogleLogin from "@/features/auth/providers/GoogleLogin";

export default function OauthForm() {
  return (
    <div className="flex flex-col gap-y-3.5">
      <GoogleLogin />
      <GithubLogin />
    </div>
  );
}
