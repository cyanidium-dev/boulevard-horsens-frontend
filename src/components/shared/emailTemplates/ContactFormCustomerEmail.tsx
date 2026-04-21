import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactFormCustomerEmailProps = {
  source?: string;
  name?: string;
  phone?: string;
  email: string;
  message?: string;
  date?: string;
};

export function ContactFormCustomerEmail({
  source,
  name,
  phone,
  email,
  message,
  date,
}: ContactFormCustomerEmailProps) {
  return (
    <Html lang="da">
      <Head />
      <Preview>Tak for din henvendelse</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={h1}>Tak for din henvendelse</Text>
          <Text style={p}>
            Vi har modtaget din besked og vender tilbage til dig hurtigst muligt.
          </Text>

          <Text style={p}>
            <strong>Dine oplysninger:</strong>
          </Text>

          <Section style={listContainer}>
            {source ? (
              <Text style={listItem}>
                <strong>Kilde: </strong>
                {source}
              </Text>
            ) : null}
            {name ? (
              <Text style={listItem}>
                <strong>Navn: </strong>
                {name}
              </Text>
            ) : null}
            {phone ? (
              <Text style={listItem}>
                <strong>Telefon: </strong>
                {phone}
              </Text>
            ) : null}
            <Text style={listItem}>
              <strong>Email: </strong>
              {email}
            </Text>
            {message ? (
              <>
                <Text style={listItem}>
                  <strong>Besked: </strong>
                </Text>
                <Text style={listItem}>{message}</Text>
              </>
            ) : null}
          </Section>

          {date ? (
            <Text style={dateText}>
              <strong>Sendt den: </strong>
              {date}
            </Text>
          ) : null}

          <Text style={{ ...p, marginBottom: 0 }}>
            Denne e-mail er genereret automatisk. Ignorér den, hvis den er modtaget
            ved en fejl.
          </Text>
          <Text style={p}>© Boulevard Beauty Salon</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  fontFamily: "Arial, sans-serif",
  fontSize: "12px",
  lineHeight: "1.2",
  color: "#ffffff",
  backgroundColor: "#000000",
  padding: "48px 16px",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
};

const h1 = {
  fontSize: "20px",
  lineHeight: "150%",
  margin: "0 0 40px 0",
  color: "#ffffff",
};

const p = {
  margin: "0 0 24px 0",
  color: "#ffffff",
  fontSize: "12px",
  lineHeight: "1.2",
};

const listContainer = {
  listStyle: "none",
  padding: "0",
  margin: "0 0 24px 0",
};

const listItem = {
  marginBottom: "16px",
  color: "#ffffff",
  fontSize: "12px",
  lineHeight: "1.2",
};

const dateText = {
  margin: "0 0 40px 0",
  color: "#ffffff",
  fontSize: "12px",
  lineHeight: "1.2",
};
