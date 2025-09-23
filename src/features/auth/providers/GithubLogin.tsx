import { FaGithub as GithubLogo } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function GithubLogin() {
  return (
    <Button className="space-x-2.5 text-lg font-semibold" variant={"outline"}>
      <GithubLogo />
      <span>Sign in with GitHub</span>
    </Button>
  );
}
