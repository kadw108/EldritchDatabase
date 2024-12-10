import Image from "next/image";

import AllResearchers from "./browse/allResearchers";
import AllEntities from "./browse/allEntities";
import AllArtifacts from "./browse/allArtifacts";
import AllExperiences from "./browse/allExperiences";

export default function Home() {
  return (
    <main>

    <p>A database of eldritch artifacts and encounters. The eldritch researcher's #1 resource!</p>
    <br/>

    <p><a href="/new/researcher">Add Researcher Listing</a></p>
    <p><a href="/new/artifact">Add Artifact Listing</a></p>
    <p><a href="/new/entity">Add Entity Listing</a></p>
    <p><a href="/new/experience">Add Experience Listing</a></p>

    <br/>
    <h2><a href="/browse">Browse Experiences</a></h2>

    <hr/>

    <AllResearchers/>
    <AllEntities/>
    <AllArtifacts/>
    <AllExperiences/>

    </main>
  );
}
