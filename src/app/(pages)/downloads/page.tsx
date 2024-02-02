import Button from "@/components/atoms/button";

interface SectionButton {
  text: string;
  target?: string;
}

interface Section {
  title: string;
  buttons: SectionButton[];
}

const sections: Section[] = [
  {
    title: "Desktop App",
    buttons: [
      { text: "MacOS App (not released)", target: undefined },
      { text: "Windows 10 (not released)", target: undefined },
      { text: "Linux App (not released)", target: undefined },
    ],
  },
  {
    title: "Mobile App",
    buttons: [
      { text: "iOS App (not released)", target: undefined },
      {
        text: "Android App",
        target:
          "https://play.google.com/store/apps/details?id=com.bodypace.mobileapp",
      },
    ],
  },
  {
    title: "Server App",
    buttons: [
      { text: "MacOS App (not released)", target: undefined },
      { text: "Windows 10 (not released)", target: undefined },
      { text: "Linux App (not released)", target: undefined },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <>
      <h1 className="font-light text-3xl text-color-primary pt-2xl pb-xl">
        Downloads
      </h1>
      <div className="flex flex-row gap-2xl">
        {sections.map((section) => (
          <article
            key={section.title}
            className="flex flex-col w-[400px] items-center gap-y-xl"
          >
            <header className="font-light text-xl text-color-primary">
              {section.title}
            </header>
            {section.buttons.map((button) => (
              <Button
                key={button.text}
                text={button.text}
                wide
                onClick={button.target}
              />
            ))}
          </article>
        ))}
      </div>
      <div className="flex flex-1" />
    </>
  );
}
