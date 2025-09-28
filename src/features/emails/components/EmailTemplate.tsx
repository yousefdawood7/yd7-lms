import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  verificationCode?: string;
}

export default function EmailTemplate({
  verificationCode,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>AWS Email Verification</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={{ padding: 0 }}>
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{ borderCollapse: "collapse" }}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      style={{
                        backgroundColor: "#27279b",
                        padding: "20px 0",
                      }}
                    >
                      <Img
                        src={"cid:logo-img"}
                        width="320"
                        height="150"
                        alt="YD7 LMS LOGO"
                        style={{
                          display: "block",
                          margin: "0 auto",
                          border: "0",
                          lineHeight: "100%",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Please enter the following verification code when prompted. If
                you don&apos;t know what that is, you can ignore this message.
              </Text>
              <Section style={upperSection}>
                <Text style={verifyText}>Verification code</Text>

                <Text style={codeText}>{verificationCode}</Text>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

EmailTemplate.PreviewProps = {
  verificationCode: "596853",
} satisfies EmailTemplateProps;

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const coverSection = {
  backgroundColor: "#fff",
  textAlign: "center" as const,
};

const upperSection = { padding: "25px 35px" };

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const mainText = { ...text, marginBottom: "14px" };
