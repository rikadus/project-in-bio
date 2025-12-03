import ProjectCard from "@/app/components/landing-page/commons/project-card";
import { TotalVisits } from "@/app/components/landing-page/commons/total-visits";
import UserCard from "@/app/components/landing-page/commons/user-card";
import { getProfileData } from "@/app/server/get-profile-data";
import NewProject from "./new-project";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/app/lib/auth";



export default async function ProfilePage({
  params,
}: {
  params: Promise <{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();


  //Get Projects

  //Usuário é dono do perfil?

  const session = await auth();

  const isOwner = profileData.userId === session?.user?.id;

  //Adicionar page view(Quantas pessoas visitaram o perfil)


  //Se o usuário não for dono do perfil, ele não pode ver o projeto,direcionar para o upgrade


  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial. </span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green font-bold">
            Faça a upgrade agora!
          </button>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>
      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        {isOwner && <NewProject profileId={profileId}/>}

      </div>
      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}
