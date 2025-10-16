import { MeetupData } from "@/models/meet.model";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

interface MeetupListProps {
  meetups: MeetupData[];
}

function MeetupList(props: MeetupListProps) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
