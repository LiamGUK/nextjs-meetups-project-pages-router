import styles from "./MeetupDetail.module.css";
import type { MeetupData } from "@/models/meet.model";

function MeetupDetail({ image, title, address, description }: MeetupData) {
  return (
    <section className={styles.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}

export default MeetupDetail;
