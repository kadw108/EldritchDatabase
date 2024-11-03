import Image from "next/image";

import AllResearchers from "./browse/allResearchers";

export default function Home() {
  return (
    <main>

    <p>A database of eldritch artifacts and encounters. The eldritch researcher's #1 resource!</p>
    <br/>

    <p><a href="/new/researcher">Add Researcher Listing</a></p>
    <p><a href="/new/artifact">Add Artifact Listing</a></p>
    <p><a href="/new/entity">Add Entity Listing</a></p>
    <p><a href="/new/experience">Add Experience Listing</a></p>

    <hr/>

    <AllResearchers/>

    </main>
  );
}
