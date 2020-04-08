import Link from 'next/link'

export default () => (
  <div>
    This is a static page goto{' '}
    <Link href="/">
      <a>dynamic</a>
    </Link>{' '}
    <Link href="/contact">
      <a>contact</a>
    </Link>{' '}
    page.
  </div>
)
