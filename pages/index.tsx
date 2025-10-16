// Root path page file - '/'

// Packages imported into file but only used in server functions will not be bundled in the client code as Next.js will detect this behind the scenes.
import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";
import type { MeetupData } from "@/models/meet.model";

// const DUMMY_MEETUPS: MeetupData[] = [
//   {
//     id: "m1",
//     title: "A first Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Sevilla_Cathedral_-_Southeast.jpg/1280px-Sevilla_Cathedral_-_Southeast.jpg",
//     address: "Some address 5, 1234 Some city",
//     description: "This is the first meet up",
//   },
//   {
//     id: "m2",
//     title: "A second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Sevilla_Cathedral_-_Southeast.jpg/1280px-Sevilla_Cathedral_-_Southeast.jpg",
//     address: "Some address 5, 1234 Some city",
//     description: "This is the second meet up",
//   },
// ];

interface HomePageProps {
  meetups: MeetupData[];
}

function HomePage(props: HomePageProps) {
  // props from component will be made available via the getStaticProps function - will pass data to it before component is mounted - MeetupList component will have all items fully rendered before pre-rendering process.
  return (
    <>
      {/* Head component from Next.js allows to set page metadata within the site <head> element */}
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

/**
 * Data fetching for Static pages - getStaticProps()
 */

// Next.js will look for a function called exactly this and execute it during the pre-rendering process (before component is fully mounted)
// getStaticProps function can be asynchronous if needs be, so can return Promises
export async function getStaticProps() {
  // Logic placed in this function will only ever execute on the server side, not Client so can be used to connect to Database's safely or pull data
  // fetch(url).then(returned data)

  // As getStaticProps only runs on the server can directly talk to database here instead of needing to fetch data via an API
  const client = await MongoClient.connect(
    "mongodb+srv://liamgroves46_db_user:GudfgyfAb1OBlRkg@cluster0.jvfhbfw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // Always need to return an object in function
  return {
    // Needs to include a key called props which will contain an object of data wanting to use in page components
    props: {
      // meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    // setting 10 will have data revalidate every 10 seconds on server before pre-rendering
    revalidate: 10, // revalidate allows to set a time limit in which request is re-generated on the server if there are requests coming in for page - regenerated pages would then replace the old pre-generated pages.
  };
  // Returned data will now be included in components when fully rendered so data used to render components will all be included in page source when loaded
}

/**
 * SERVER SIDE RENDERING PROPS - getServerSideProps()
 */

// getServerSideProps function will run on the server but after pre-rendering and deployment
// export async function getServerSideProps(context) {
//   // Logic added in here will again only run on the server and NOT Client but will run after the component has been mounted - can't be used SSG
//   // serverSideProps function gets access to context object which provides access to request and response data
//   // const req = context.req;
//   // const res = context.res;

//   // Need to return an object with props key to use in page components
//   return {
//     // Can't use revalidate in object as not applicable for serverSideProps
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
