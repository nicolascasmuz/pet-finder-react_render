import algoliasearch from "algoliasearch";

const client = algoliasearch("E8DDTO76Q8", "ae188ac13f1eb017fb373e783d766a8c");

const missingPetsIndex = client.initIndex("missingpets");
const profilesIndex = client.initIndex("profiles");

export { missingPetsIndex, profilesIndex };
