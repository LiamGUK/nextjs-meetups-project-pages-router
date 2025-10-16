// dynamic path route for individual meetup page - our-domain.com/[meetupId]

import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import type { MeetupData } from "@/models/meet.model";
import type { GetStaticPathsResult } from "next";

interface MeetupDetailsPageProps {
  meetupData: MeetupData;
}

// Props to page component exposed via getStaticProps function below
function MeetupDetailsPage(props: MeetupDetailsPageProps) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

interface StaticPropsParams {
  meetupId: string;
}

interface StaticPropsResult {
  props: {
    meetupData: MeetupData;
  };
}

// getStaticPaths function is required to be exported from a dynamic page that uses the getStaticProps function
// Required as Next.js will need to know all id values that are needed to pre-generate the pages
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const client = await MongoClient.connect(
    "mongodb+srv://liamgroves46_db_user:GudfgyfAb1OBlRkg@cluster0.jvfhbfw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // in find() method pass in an empty object for 1st argument as don't need to return entire data back, pass in a second object with the _id key set to 1 to have MongoDB return all the id values stored in collection
  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  // Need to return an object with a paths key which holds an array of objects each with their own params key which included dynamic path name with the value for each.
  // Would use fetch to pull all required IDs and dynamically loop through and generate each paths object programmatically.
  return {
    // fallback: false, // set fallback to false if you have added all known dynamic values in paths array - would pre-render all routes statically, setting to true would indicate that only a few paths are known and would only generate the ones it can and then attempt to generate unknown paths on the server after pre-rendering otherwise will output a 404 page
    fallback: "blocking", // Setting fallback to blocking will tell Next.js that if a new id value is provided that doesn't exist on Database it will generate that page on demand and then cache it.
    paths: meetups.map((meeptup) => ({
      params: { meetupId: meeptup._id.toString() },
    })),
    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

// As data for component doesn't change incrementally using getStaticProps is the ideal choice for fetching data for component
export async function getStaticProps(context: {
  params: StaticPropsParams;
}): Promise<StaticPropsResult> {
  // fetch data for single meetup

  // context parameter for getStaticProps function exposes the URL params of active page allowing you to get access to dynamic URL params inside function.
  const meetupId = context.params.meetupId;

  // as getStaticProps function always runs on the server can safely run database implementation logic with credentials and will never be exposed to Client
  const client = await MongoClient.connect(
    "mongodb+srv://liamgroves46_db_user:GudfgyfAb1OBlRkg@cluster0.jvfhbfw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // findOne() method returns one collection item from database by passing in object criteria to match by - use id from URL param to match with ID value stored in database
  const selectedMeetup = await meetupsCollection.findOne({
    // use ObjectId method to convert id param to a MongoDB id value
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup!.title,
        address: selectedMeetup!.address,
        description: selectedMeetup!.description,
        image: selectedMeetup!.image,
      },
    },
  };
}

export default MeetupDetailsPage;
