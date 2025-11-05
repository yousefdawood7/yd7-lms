import { Card, CardContent, CardTitle } from "@/components/ui/card";
import EmailOTP from "@/features/auth/_components/providers/Email/EmailOTP";

type PageProps = {
  searchParams: Promise<{ email: string }>;
};

export default async function page({ searchParams }: PageProps) {
  const { email } = await searchParams;

  if (!email) {
    return (
      <Card>
        <CardContent className="text-center text-2xl">
          <CardTitle>No email provided</CardTitle>
        </CardContent>
      </Card>
    );
  }

  return <EmailOTP email={email} />;
}
