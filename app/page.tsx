import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
          <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Jishnu JP
      </h1>

      <div className="my-8 animate-fade-in text-center">
        <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto px-4">
          Experienced Full-Stack Developer | Scalable & AI-Powered Solutions
        </p>
        
        <p className="mt-4 text-zinc-400 text-sm max-w-2xl mx-auto px-4">
          Building high-performance, scalable, and AI-driven applications using modern web technologies. 
          Passionate about crafting seamless user experiences and robust backend systems.
        </p>

        <div className="mt-8 flex flex-col gap-4 text-zinc-400 text-sm">
          <p className="font-medium">Tech Stack:</p>
          <div className="flex flex-col justify-center gap-4 px-4 ">
            <span>🛠️ Frontend: Next.js, React.js, HTML, CSS, Tailwind</span>
            <span>⚙️ Backend: Node.js, RTK, MongoDB, Serverless</span>
            <span>📦 DevOps & Cloud: Docker, Git, AWS EC2, S3</span>
            <span>🤖 AI & OS: LLMs, Linux, Ubuntu</span>
          </div>
        </div>
      </div>
    </div>
  );

}
