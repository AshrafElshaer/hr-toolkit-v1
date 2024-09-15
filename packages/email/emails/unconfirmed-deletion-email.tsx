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

export function UnconfirmedDeletionEmail() {
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
        <Preview>Your Unconfirmed Account Has Been Deleted</Preview>
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
              Dear User ,
            </Heading>

            <Text
              className={`text-[14px]  text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] w-full `}
            >
              We're writing to inform you that your unconfirmed account with HR
              Toolkit has been deleted. This action was taken because your email
              address was not confirmed within 7 days of registration.
            </Text>

            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
            >
              What This Means:
            </Text>
            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
            >
              • Your unconfirmed account and associated data have been removed
              from our systems.
            </Text>
            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
            >
              • You will need to register again if you wish to use our services.
            </Text>

            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mt-4`}
            >
              If you still wish to use our services, you're welcome to register
              again at <Link href={baseUrl}>HR Toolkit</Link>. Please make sure
              to confirm your email address within 7 days of registration to
              avoid automatic deletion.
            </Text>

            <Text
              className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mt-4`}
            >
              If you believe this action was taken in error or if you have any
              questions, please contact our support team at{" "}
              <Link href="mailto:support@hrtoolkit.com">
                support@hrtoolkit.com
              </Link>
              .
            </Text>
            <Section className="mt-[16px] text-center">
              <Text
                className={`text-base text-[${colors.lightTheme.mutedForeground}] dark:text-[${colors.darkTheme.mutedForeground}] `}
              >
                Thank you for your interest in HR Toolkit.
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

export const renderUnconfirmedDeletionEmail = render(
  <UnconfirmedDeletionEmail />,
);

export default UnconfirmedDeletionEmail;
