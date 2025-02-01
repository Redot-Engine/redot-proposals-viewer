"use client";

import { cn } from "@/lib/utils";

type Alignment = "left" | "center" | "right";

interface SectionHeaderProps {
  readonly title: string;
  readonly description: string;
  readonly titleAlignment?: Alignment;
  readonly descriptionAlignment?: Alignment;
  readonly maxWidth?: string | number;
}

export default function SectionHeader({
  title,
  description,
  titleAlignment = "center",
  descriptionAlignment = "center",
  maxWidth = 540,
}: Readonly<SectionHeaderProps>) {
  const titleTextAlignClass = cn({
    "text-left": titleAlignment === "left",
    "text-center": titleAlignment === "center",
    "text-right": titleAlignment === "right",
  });

  const descriptionTextAlignClass = cn({
    "text-left": descriptionAlignment === "left",
    "text-center": descriptionAlignment === "center",
    "text-right": descriptionAlignment === "right",
  });

  const maxWidthClass =
    typeof maxWidth === "number" ? `max-w-[${maxWidth}px]` : `max-w-[${maxWidth}]`;

  return (
    <div className={cn("mx-auto", maxWidthClass)}>
      {title && (
        <h2
          className={cn(
            "mt-5 text-4xl font-bold tracking-tighter md:text-[54px] md:leading-[60px]",
            titleTextAlignClass
          )}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={cn(
            "text-muted-foreground mt-5 text-xl tracking-tighter md:text-[22px] md:leading-[30px]",
            descriptionTextAlignClass
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
