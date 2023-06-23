//In dit document kan ik de head eigenschappen en de body indeling aanpassen.
import { Html, Head, Main, NextScript } from "next/document";
import Header from './header';

//Hier zit de link van de manifest.json voor de PWA.
//De maninfest zit in de public folder en met next werd er automatisch een service worker aangemaakt.
export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff" />
                <title>Steam API</title>
            </Head>
            <body>
                <Header />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
