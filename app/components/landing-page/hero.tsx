export default function Hero() {
  return (
    <div className="flex border">
      <div className="w-full flex flex-col gap-2 mt-[35vh] border">
        <h1 className="text-5xl font-bold text-white leading-[64px]">
          Seus Projetos e Redes Sociais em um únco Link
        </h1>
        <h2 className="text-xl leading-6">
          Crie sua própia página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques.
        </h2>
        <div className="flex items-center gap-2 w-full -mt-[10vh]">
          <span className="text-white text-xl">projectinbio.com</span>
          <input type="text" />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Criar agora
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB, transparent)]">
        <div className="relative">
          {/*<UserCard />*/}
          <div className="absolute -botton-[7%] -right-[45%]">
            {/*<TotalVisits />*/}
          </div>
          <div className="absolute top-[20%] -left-[45%] -z-10">
            {/*<ProjectCard />*/}
          </div>
          <div className="absolute -top-[5%] -left-[55%] -z-10">
            {/*<ProjectCard />*/}
          </div>
        </div>
      </div>
    </div>
  );
}
