import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EmailOTP from "@/features/auth/providers/Email/EmailOTP";

type PageProps = {
  searchParams: Promise<{ email: string }>;
};

export default async function page({ searchParams }: PageProps) {
  const { email } = await searchParams;

  if (!email) {
    return (
      <Card>
        <CardHeader className="text-center text-2xl">
          <CardTitle>No email provided</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return <EmailOTP email={email} />;
}
