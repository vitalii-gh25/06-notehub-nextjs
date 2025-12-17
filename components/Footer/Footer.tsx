//components/Footer/Footer.tsx

import css from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: your name</p>
          <p>
            Contact us:&nbsp;
            <Link href="mailto:student@notehub.app" aria-label="Home">
              student@notehub.app
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
