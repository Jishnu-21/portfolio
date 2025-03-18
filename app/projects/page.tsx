import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import type { Project } from "contentlayer/generated";

export const revalidate = 60;
export default async function ProjectsPage() {
  // Get all published projects
  const publishedProjects = allProjects.filter((p) => p.published);
  
  // Find the NovelWriter project and make it featured
  const featured = publishedProjects.find(p => p.title === "Novelwriter.art");
  const secondProject = publishedProjects.find(p => p.title === "3rdShade");
  
  // If featured project not found, use the first project
  const mainProject = featured || secondProject || publishedProjects[0];
  
  // Sort remaining projects by date
  const otherProjects = publishedProjects
    .filter(p => p !== mainProject && p !== secondProject)
    .sort((a, b) =>
      new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
      new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  // Get the next project for third spot
  const [thirdProject] = otherProjects;

  // Get remaining projects
  const remainingProjects = otherProjects.slice(1);

  // Ensure we have valid projects for the top spots
  const topProjects = [secondProject, thirdProject].filter((p): p is Project => Boolean(p));

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Showcasing my expertise in full-stack development and interactive experiences.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {mainProject && (
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            <Card>
              <Link href={`/projects/${mainProject.slug}`}>
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">
                      {mainProject.date ? (
                        <time dateTime={new Date(mainProject.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(mainProject.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {mainProject.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {mainProject.description}
                  </p>
                  <div className="absolute bottom-4 md:bottom-8">
                  </div>
                </article>
              </Link>
            </Card>

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
              {topProjects.map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={0} />
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          {[0, 1, 2].map((columnIndex) => (
            <div key={columnIndex} className="grid grid-cols-1 gap-4">
              {remainingProjects
                .filter((_, i) => i % 3 === columnIndex)
                .map((project) => (
                  <Card key={project.slug}>
                    <Article project={project} views={0} />
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
