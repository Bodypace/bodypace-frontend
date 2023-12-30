interface TextProps {
  text: string;
}

function Title({ text }: TextProps) {
  return (
    <h1 className="font-bold underline text-2xl text-color-primary">{text}</h1>
  );
}

function Header({ text }: TextProps) {
  return <h2 className="font-bold text-xl text-color-primary">{text}</h2>;
}

interface ParagraphProps extends TextProps {
  warning?: boolean;
}

function Paragraph({ text, warning = false }: ParagraphProps) {
  if (warning) {
    return (
      <p className="border-l-[5px] border-color-warning pl-md font-regular text-lg text-color-primary">
        {text}
      </p>
    );
  }
  return <p className="font-regular text-lg text-color-primary">{text}</p>;
}

function List({ children }: any) {
  return (
    <ul className="marker:text-color-primary list-none flex flex-col marker:text-lg  gap-md">
      {children}
    </ul>
  );
}

function ListItem({ text }: TextProps) {
  // this is implemented incorrectly, I used random pixel values
  // https://stackoverflow.com/questions/9163240/text-is-wrapping-under-bullet-in-css-list
  return (
    <li className="before:content-['•'] before:-ml-[28px] before:mr-[8px] pl-xl font-regular text-lg text-color-primary">
      {text}
    </li>
  );
}

List.Item = ListItem;

const Document = {
  Title,
  Header,
  Paragraph,
  List,
};

export default Document;
