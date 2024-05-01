export enum DocumentPartType {
  Title = 1,
  Header = 2,
  SubHeader = 3,
  Paragraph = 4,
}

type LinksDescription = {
  href: string;
  text: string;
};

export type DocumentPart = [
  DocumentPartType,
  string,
  Map<string, LinksDescription>?,
];

function Paragraph({
  text,
  linksDescription,
}: {
  text: string;
  linksDescription: Map<string, LinksDescription>;
}) {
  const regex = /({{(\w+)}})|(.+?(?={{\w+}}))|(.+)/g;
  const matches = Array.from(text.matchAll(regex));

  try {
    return (
      <p className="font-clean text-md">
        {matches.map(([match, _, key]) => {
          if (!key) return match;
          const { text: linkText, href } = linksDescription.get(key)!;
          return (
            <a
              key={key}
              className="underline hover:no-underline text-[blue]"
              href={href}
            >
              {linkText}
            </a>
          );
        })}
      </p>
    );
  } catch (err) {
    return <p>invalid paragraph</p>;
  }
}

export default function Document({ document }: { document: DocumentPart[] }) {
  return (
    <article className="flex flex-1 flex-col gap-lg py-2xl w-[1000px] text-color-primary">
      {document.map(([type, text, linksDescription]) => {
        switch (type) {
          case DocumentPartType.Title:
            return (
              <h1 key={text} className="font-brand text-xl">
                {text}
              </h1>
            );
          case DocumentPartType.Header:
            return (
              <h2 key={text} className="font-brand text-lg">
                {text}
              </h2>
            );
          case DocumentPartType.SubHeader:
            return (
              <h3 key={text} className="font-brand text-md">
                {text}
              </h3>
            );
          case DocumentPartType.Paragraph:
            return (
              <Paragraph
                key={text}
                text={text}
                linksDescription={linksDescription || new Map()}
              />
            );
        }
      })}
    </article>
  );
}
