import Flight from "@/components/partials/Flight/flight";
import Navbar from "@/components/partials/Navbar";

export default function Home() {
  return (
    <>
      <Navbar className={"sticky top-0 z-30"} />
      <Flight />
    </>
  );
}
