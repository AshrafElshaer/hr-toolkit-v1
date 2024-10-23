import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "./react-query";
import ThemeProvider from "./theme";
import ToastProvider from "./toast";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <NuqsAdapter>
      <ReactQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
        <ToastProvider position="top-right" duration={5000} />
      </ReactQueryProvider>
    </NuqsAdapter>
  );
}
