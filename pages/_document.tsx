import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { getBuildConfig } from "@/app/config/build";

const buildConfig = getBuildConfig();

const metadata = {
  description: "Your personal ChatGPT Chat Bot.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "ChatGPT Next Web",
    statusBarStyle: "default",
  },
};

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={metadata.description} />
          <meta name="version" content={buildConfig.commitId} />
          <meta
            name="apple-mobile-web-app-title"
            content={metadata.appleWebApp.title}
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content={metadata.appleWebApp.statusBarStyle}
          />
          {metadata.themeColor.map((item, index) => (
            <meta
              key={index}
              name="theme-color"
              media={item.media}
              content={item.color}
            />
          ))}
          <link rel="manifest" href="./site.webmanifest"></link>
          <link rel="preconnect" href="https://fonts.proxy.ustclug.org"></link>
          <script src="./serviceWorkerRegister.js" defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
