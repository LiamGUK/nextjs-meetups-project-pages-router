import type { PropsWithChildren } from "react";
import classes from "./Card.module.css";

function Card(props: PropsWithChildren) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
