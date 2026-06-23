type SectionHeaderProps = {
  as?: "h1" | "h2";
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  as = "h2",
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  const TitleTag = as;

  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-medium text-teal-800">
          {eyebrow}
        </p>
      ) : null}
      <TitleTag className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-[2rem]">
        {title}
      </TitleTag>
      {description ? (
        <p className="mt-3 text-base leading-7 text-zinc-600">{description}</p>
      ) : null}
    </div>
  );
}
