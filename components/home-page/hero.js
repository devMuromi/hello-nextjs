import Image from "next/image";

import classes from "./hero.module.css";

function hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/muromi.jpg" alt="An image of Muromi" width={300} height={300} />
      </div>
      <h1>Hi, I'm Muromi</h1>
      <p>I blog blah blah</p>
    </section>
  );
}

export default hero;
