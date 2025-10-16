// meetup page path file - our-domain/new-meetup

import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import type { MeetupData } from "@/models/meet.model";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetup: MeetupData) {
    // In Next.js page components can make network requests directly in component with no need for hooks
    // To use API endpoint created in the api folder only need to pass in path to file of api wanting call - will always point to root of Next.js project so can pass in /api/<end-point>
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetup),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Next.js will automatically call api function defined in file within api folder when endpoint is accessed in fetch method and then return back the response.

    const data = await res.json();
    console.log(data);

    // replace method from useRouter Hook redirects the user to the specified page but also removes page from history stack (prevents ability to go back with back button)
    router.replace("/"); // alternative to push() method
  }

  return (
    <div>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing new opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
}

export default NewMeetupPage;
