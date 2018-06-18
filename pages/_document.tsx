// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
const styles = require('./styles.less');
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body className={styles.body} >
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}