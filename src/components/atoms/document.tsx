export enum DocumentPartType {
  Title = 1,
  Header = 2,
  Paragraph = 3,
}
export type DocumentPart = [DocumentPartType, string];

export default function Document({ document }: { document: DocumentPart[] }) {
  return (
    <article className="flex flex-1 flex-col gap-xl py-2xl w-[1000px] text-color-primary">
      {document.map(([type, text]) => {
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
          case DocumentPartType.Paragraph:
            return (
              <p key={text} className="font-clean text-md">
                {text}
              </p>
            );
        }
      })}
    </article>
  );
}
