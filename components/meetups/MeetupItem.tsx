import { useRouter } from "next/router";
import Card from "../ui/Card";
import type { MeetupData } from "@/models/meet.model";
import classes from "./MeetupItem.module.css";

function MeetupItem(props: MeetupData) {
  // example method to programmatically navigate to a dynamic page in Next.js (alternative to use Link component to navigate in app)

  const router = useRouter();

  function showDetailsHandler() {
    // push method in useRouter object allows to add a new page to stack of pages to navigate to (alternative to use <Link> component)
    router.push("/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
