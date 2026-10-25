"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { projects, projectsHeader, projectsCta } from "@/data/projects";

// Exact Figma layer specs — desktop (1320x871 stage)
const LAYER_SPECS = [
  { width: 1320, height: 760, left: 0, top: 111 },
  { width: 1220, height: 702, left: 50, top: 40 },
  { width: 1120, height: 645, left: 100, top: 0 },
];

export default function ProjectsSection() {
  const [order, setOrder] = useState<number[]>(projects.map((_, i) => i));

  const bringToFront = (index: number) => {
    setOrder((prev) => [index, ...prev.filter((i) => i !== index)]);
  };

  return (
    <section
  id="projects"
  className="w-full bg-bg-deep px-5 py-8 sm:px-8 md:py-24 lg:px-10 flex flex-col items-center gap-12"
>
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-white font-display font-bold text-[32px] md:text-[64px] leading-[32px] md:leading-[64px] capitalize max-w-[780px]">
          {projectsHeader.title}
        </h2>
        <p className="text-[#B8A098] font-body text-base leading-[25.6px] max-w-[636px]">
          {projectsHeader.subtitle}
        </p>
      </div>

      {/* Stage: mobile 335x218.88, desktop 1320x871 */}
      <div className="relative w-full max-w-[1320px] aspect-[335/218.88] md:aspect-[1320/871]">
        {order.map((projectIdx, layerPos) => {
          const project = projects[projectIdx];
          const spec = LAYER_SPECS[layerPos];
          const isFront = layerPos === 0;

          return (
            <div
              key={project.slug}
              onClick={() => !isFront && bringToFront(projectIdx)}
              style={{
                width: `${(spec.width / 1320) * 100}%`,
                height: `${(spec.height / 871) * 100}%`,
                left: `${(spec.left / 1320) * 100}%`,
                top: `${(spec.top / 871) * 100}%`,
                zIndex: 3 - layerPos,
              }}
              className={`absolute rounded-lg md:rounded-2xl outline outline-1 md:outline-2 outline-white -outline-offset-1 md:-outline-offset-2 overflow-hidden p-2 md:p-5 transition-all duration-500 ${
                isFront ? "" : "cursor-pointer"
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 1320px"
                priority={isFront}
              />

              {isFront && (
                <>
                  {/* Mobile card */}
                  <div className="md:hidden absolute bottom-2 left-2 right-2 z-10 self-stretch p-2 bg-zinc-900 rounded-sm outline outline-1 outline-offset-[-0.50px] outline-stone-300/20 inline-flex justify-start items-center gap-1.5">
                    <div className="flex-1 inline-flex flex-col justify-center items-start gap-1">
                      <div className="self-stretch justify-start text-white text-base font-bold font-['Cabinet_Grotesk'] capitalize leading-4 line-clamp-1">
                        {project.title}
                      </div>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-[#701520] rounded-sm flex justify-center items-center"
                      aria-label={`Open ${project.title}`}
                    >
                      <Image
                        src="/icons/arrow-up-right.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </a>
                  </div>

                  {/* Desktop card */}
                  <div className="hidden md:flex absolute bottom-5 left-5 right-5 z-10 items-center gap-5 bg-[#1A1A1A] outline outline-1 outline-[#E8D8D0]/20 -outline-offset-1 rounded-xl p-5">
                    <div className="flex-1 flex flex-col gap-2">
                      <h3 className="text-white font-display font-bold text-[28px] leading-[28px] capitalize">
                        {project.title}
                      </h3>
                      <p className="text-[#F5EDE8] font-body font-medium text-[16px] leading-[25.6px] capitalize">
                        {project.description}
                      </p>
                    </div>

                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-[#701520] hover:bg-[#8a1a28] transition-colors"
                      aria-label={`Open ${project.title}`}
                    >
                      <Image
                        src="/icons/arrow-up-right.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </a>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <Button href={projectsCta.href} variant="light">
        {projectsCta.label}
      </Button>
    </section>
  );
}