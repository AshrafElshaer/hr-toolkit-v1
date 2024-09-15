import {
  Body,
  Container,
  Font,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  render,
} from "@react-email/components";
import React from "react";
import { colors } from "../components/colors.js";
import Logo from "../components/logo.js";

const baseUrl = "https://dashboard.hrtoolkit.app";

export function AccountDeletionsNotice() {
  return (
    <Html>
      <Tailwind>
        <head>
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />

          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-500-normal.woff2",
              format: "woff2",
            }}
            fontWeight={500}
            fontStyle="normal"
          />
        </head>
        <Preview>Important: Your Account Needs Confirmation</Preview>
        <Body
          className={` bg-[${colors.lightTheme.background}] dark:bg-[${colors.darkTheme.background}] py-8 `}
        >
          <Container
            className={`w-[560px] rounded-lg border  border-[${colors.lightTheme.border}] dark:border-[${colors.darkTheme.border}] bg-transparent p-8 py-16 mx-auto   shadow `}
            style={{ borderStyle: "solid", borderWidth: "1px" }}
          >
            <Logo />
            <Heading
              className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]  `}
            >
              Dear User,
            </Heading>

            <Text
              className={`text-[14px]  text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] w-full `}
            >
              We noticed that you registered for an account with HR Toolkit 4
              days ago, but you haven't confirmed your email address yet. We
              wanted to remind you that your account confirmation is pending.
            </Text>

            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mt-4`}
            >
              Important Notice:
            </Text>
            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
            >
              • If your email remains unconfirmed, your account will be
              automatically deleted in 3 days.
            </Text>
            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
            >
              • To keep your account active, please confirm your email as soon
              as possible. by logging into your account{" "}
              <Link href={`${baseUrl}/auth`}>here</Link>.
            </Text>

            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mt-4`}
            >
              To confirm your email, please check your inbox for our
              confirmation email and follow the instructions. If you can't find
              the email, please check your spam folder.
            </Text>

            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mt-4`}
            >
              If you need assistance or believe this message is in error, please
              contact our support team at{" "}
              <Link href="mailto:support@hrtoolkit.com">
                support@hrtoolkit.com
              </Link>
              .
            </Text>
            <Section className="mt-[16px] text-center">
              <Text
                className={`text-base text-[${colors.lightTheme.mutedForeground}] dark:text-[${colors.darkTheme.mutedForeground}] `}
              >
                Thank you for choosing HR Toolkit.
              </Text>
              <Text
                className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]  mt-2`}
              >
                Best regards,
              </Text>
              <Text
                className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]  mt-2`}
              >
                The HR Toolkit Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export const renderAccountDeletionsNotice = render(
  <AccountDeletionsNotice />,
);

export default AccountDeletionsNotice;
