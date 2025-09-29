import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OauthForm from "@/features/auth/OauthForm";
import EmailForm from "@/features/auth/providers/Email/EmailForm";

export default async function page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-lg">
          Login with your Google or GitHub Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5.5">
        <OauthForm />
        <p className="text-muted-foreground 5 after:bg-muted-foreground relative text-center text-lg after:absolute after:inset-0 after:top-1/2 after:-z-0 after:h-0 after:translate-y-1/2 after:border">
          <span className="bg-card relative z-10 px-2.5">or continue with</span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col gap-y-3.5">
          <EmailForm />
        </div>
      </CardFooter>
    </Card>
  );
}
