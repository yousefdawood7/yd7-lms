import { FaGithub as GithubLogo, FaGoogle as GoogleLogo } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-lg">
          Login with your Google or GitHub Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5.5">
        <div className="flex flex-col gap-y-3.5">
          <Button
            className="space-x-2.5 text-lg font-semibold"
            variant={"outline"}
          >
            <GoogleLogo />
            <span>Sign in with Google</span>
          </Button>
          <Button
            className="space-x-2.5 text-lg font-semibold"
            variant={"outline"}
          >
            <GithubLogo />
            <span>Sign in with GitHub</span>
          </Button>
        </div>

        <p className="text-muted-foreground 5 after:bg-muted-foreground relative text-center text-lg after:absolute after:inset-0 after:top-1/2 after:-z-0 after:h-0 after:translate-y-1/2 after:border">
          <span className="bg-card relative z-10 px-2.5">or continue with</span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col gap-y-3.5">
          <p className="text-xl font-semibold">Email</p>
          <Input placeholder="me@example.com" />
          <Button className="font-semibold tracking-tight">
            Continue with Email
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
