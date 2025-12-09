
import { auth } from "@/app/lib/auth";
import Button from "./ui/button";
import { manageAuth } from "@/app/actions/manager-auth";
import Link from "next/link";
import { getProfileId } from "@/app/server/get-profile-data";


export default async function Header() {

  const session = await auth();

  const profileId = await getProfileId(session?.user?.id as string) 

  console.log(session);
  return (
    <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="ProjectInbio Logo" />
        <h3 className="text-white text-2xl font-bold">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">

      {session && 
      <Link href={`/${profileId}`}>
      <Button>Minha Página</Button>
      </Link>}

        <form action={manageAuth}>
          <Button>{session ? "Sair" : "Login"}</Button>
        </form>
        
      </div>
    </div>
  );
}

