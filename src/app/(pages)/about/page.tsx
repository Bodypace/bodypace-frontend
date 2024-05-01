import Document, {
  DocumentPart,
  DocumentPartType,
} from "@/components/atoms/document";

//prettier-ignore
const document: DocumentPart[] = [
  [ DocumentPartType.Paragraph, 'Last updated on: 2024-04-27' ],
  [ DocumentPartType.Title, "About us, plans, development, contributions, future etc." ],

  [ DocumentPartType.Paragraph, "Currently this project is developed only by {{github}} (me). Some time ago I needed a new side project to improve my fullstack development skills while also being frustrated about the lack of true privacy, automation and cross-systems integration in healthcare/fitness. In the end, although this is a learning experience, I think that the idea is at least somewhat sensible so if anyone would like to join the development I'm open to it, more info here on {{company_structure}}. I'm developing this project without any funding, subscription costs will always fully cover operational costs to be able to develop this project at whatever pace I want and to avoid a situation where I would need to close this project and close existing accounts because it wasn't profitable enough. I plan on shipping Bodypace as an actual product that can be treated as a reliable app by users (having legally bounding SLA etc.) instead of a \"hobby website\" however currently Bodypace is in free beta version so it's not ready for it yet and I may drop development before it happens, for now I have enough time and motivation to be on track but it's still mostly learning experience.", new Map(Object.entries({
    "github": {
      text: "@robert-dorna",
      href: "https://github.com/robert-dorna"
    },
    "company_structure": {
      text: "how I'd like the teamwork, ownership and potential profits to be structured",
      href: "https://github.com/Bodypace/bodypace-smart-contracts/blob/main/Organization.pdf"
    }
  })) ],

  [ DocumentPartType.Header, "Development" ],
  [ DocumentPartType.Paragraph, "Bodypace is open-source, {{source_code}} is on GitHub. Everything is under {{apache_license}}.", 
    new Map(Object.entries({
      "source_code": {
        text: "source code",
        href: "https://github.com/Bodypace"
      },
      "apache_license": {
        text: "Apache License 2.0",
        href: "https://choosealicense.com/licenses/apache-2.0"
      }
    }))
  ],
  [ DocumentPartType.Paragraph, "Here are some useful links related to development and planning future work:"],
  [ DocumentPartType.Paragraph, "- {{project_board}}",        new Map(Object.entries({"project_board":        {text: "Project Board",         href: "https://github.com/orgs/Bodypace/projects/1"}}))],
  [ DocumentPartType.Paragraph, "- {{notes}}",                new Map(Object.entries({"notes":                {text: "Notes & Plans (Excalidraw)",    href: "https://excalidraw.com/#json=ygB1nKixisafSPzVl_fYF,jNaFoUt9TxLG5aqFLh_ReA"}}))],
  [ DocumentPartType.Paragraph, "- {{figma}}",                new Map(Object.entries({"figma":                {text: "UI/UX designs (Figma)", href: "https://www.figma.com/file/8MHd4BSbKtJgd2iLiF6zd1/Main?type=design&node-id=0-1&mode=design"}}))],
  [ DocumentPartType.Paragraph, "- {{figma_preview}}",        new Map(Object.entries({"figma_preview":        {text: "Interactive design preview (Figma)",  href: "https://www.figma.com/proto/8MHd4BSbKtJgd2iLiF6zd1/Main?type=design&node-id=2115-2498&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2115%3A2498&hide-ui=1"}}))],
  [ DocumentPartType.Paragraph, "- {{storybook}}",            new Map(Object.entries({"storybook":            {text: "UI/UX tests (Storybook)", href: "https://www.chromatic.com/builds?appId=658431e13fa7917e8e2ddd48&branch=main"}}))],
  [ DocumentPartType.Paragraph, "- {{storybook}}",            new Map(Object.entries({"storybook":            {text: "Storybook (maybe not latest, but recent one)", href: "https://658431e13fa7917e8e2ddd48-onobszufzi.chromatic.com/?path=/docs/atoms-button--docs"}}))],
  [ DocumentPartType.Paragraph, "- {{personal_server_api}}",  new Map(Object.entries({"personal_server_api":  {text: "Swagger Backend API",   href: "https://api.bodypace.org"}}))],
  [ DocumentPartType.Paragraph, "- {{mobile_app}}",           new Map(Object.entries({"mobile_app":  {text: "Mobile App (Placeholder, works but not good enough to seriously use it)",   href: "https://play.google.com/store/apps/details?id=com.bodypace.mobileapp"}}))],
  [ DocumentPartType.Paragraph, "I know it's a bunch of links without any guide. Don't hesitate to contact me if you are actually interested in the project: {{my_email}}",
    new Map(Object.entries({
      "my_email": {
        text: "rdorna8@gmail.com",
        href: "mailto:rdorna8@gmail.com"
      },
    }))
  ],

  [ DocumentPartType.Header, "Goals = Data Vault & AI Doctor & Logistics Assistant" ],
  [ DocumentPartType.Paragraph, "A. Open and privacy respecting health data cloud "],
  [ DocumentPartType.SubHeader, "- Import all your health data into one place (cloud), entered manually or automatically via various integrations" ],
  [ DocumentPartType.SubHeader, "- Be sure that literally nobody except you (and people you explicitly chose) has access to your data, not even server administrators, Bodypace developers, politicians through police etc." ],
  [ DocumentPartType.SubHeader, "- Be able to share your data to anybody you wish (e.g. doctor) and access it from all of your devices" ],
  [ DocumentPartType.SubHeader, "- Be sure that all your data is backed up " ],
  [ DocumentPartType.SubHeader, "- Connect all your data gathering devices (e.g. smart watch) to this cloud to have literally all information about you there (that is why it's extremely important for this cloud to be secure and privacy respecting)" ],
  [ DocumentPartType.SubHeader, "- Keep all your improvement plans, progress metrics, workouts, diet, treatments, doctor stuff (appointments, diagnoses etc.) and more in this on place" ],
  [ DocumentPartType.Paragraph, "B. Algorithms for interpreting your health (preventive, treatments, improvement plans)" ],
  [ DocumentPartType.SubHeader, "- Be able to run them offline and locally to avoid exposing your data" ],
  [ DocumentPartType.SubHeader, "- Detect current and incoming health problems (dodge incoming issues and get treatments for existing ones)" ],
  [ DocumentPartType.SubHeader, "- Detect gap between your current state and your potential (ofc. optional and derived from your personal values, opinions etc.)" ],
  [ DocumentPartType.SubHeader, "- Constantly generate progress metrics and other new data/insights from the data you already have" ],
  [ DocumentPartType.Paragraph, "C. Assistance with logistics" ],
  [ DocumentPartType.SubHeader, "- Attach summaries of availability, costs, locations, effort and time connected to each treatment, diagnosis, plan, supplement etc. given by algorithms and stored in cloud" ],
  [ DocumentPartType.SubHeader, "- cost aware comparisons and optimizations of everything" ],
  [ DocumentPartType.SubHeader, "- Integrations with clinics, their locations, offers and prices" ],
  [ DocumentPartType.SubHeader, "- Integrations with pharmas, their locations, offers and prices" ],
  [ DocumentPartType.SubHeader, "- (Maybe) integrate DICOM viewers and other software into website (with WASM, WebGL, WebGPU, program streaming etc.)" ],
  [ DocumentPartType.SubHeader, "- More, will write later" ],
  [ DocumentPartType.Paragraph, "Overall, I want to augment different EHRs, interop them and extend with additional functionalities + privacy so some records are still there + in Bodypace cloud and others are only Bodypace cloud. This will keep compatibility with emergency rooms, insurance companies and research while allowing for users (\"patients\") to use without worries more personalized medicine, more intense life/health tracking etc. I'm only gonna develop A, maybe C. B (\"AI Doctor\") I will just take the open-source variant when it arrives." ],

  [ DocumentPartType.Header, "Idk, slogans I guess?" ],
  [ DocumentPartType.SubHeader, "Personalized & Private" ],
  [ DocumentPartType.Paragraph, "Don't miss anything important health-wise while living care-free. Interpret your data with the latest medical knowledge to get personalized and cost-aware recommendations, both proactive and reactive. Every result generated has available explanations of where it came from. Our algorithms, which analyze your data, never expose it and can be run offline anonymously without any account. Our free and optional \"Online account\" supports data stored on local devices." ],
  [ DocumentPartType.SubHeader, "Secure & Decentralized" ],
  [ DocumentPartType.Paragraph, "Even we don't have access to your data. When using Bodypace, your data is truly yours; there is no need to trust a company or a government. We don't have to make any claims that your data is safe, as it's impossible for us to read your data, analyze it, sell it, etc. You can store your data in our cloud but don't have to. There is no obligatory central database. We provide you with an optional \"Online account\" which offers optional storage, but you may as well keep all or some data on your devices." ],
  [ DocumentPartType.SubHeader, "Open & Trustless" ],
  [ DocumentPartType.Paragraph, "Our source code, finances and development process are an open book. Everyone can audit and contribute to Bodypace. Everything is shared under simple and permissive licenses. Data on our servers (\"Online account\") is fully encrypted, but if you don't trust it, you can read the source-code, spin up your own Bodypace server instance, or keep your data somewhere else. If you decide to use our cloud storage, that's is the only thing you pay for; features developed by Bodypace are actually free." ],

  [ DocumentPartType.Header, "Vague set of integrations & functions that need to be developed" ],

  [ DocumentPartType.Paragraph, "devices/IoT: smartphones, smart homes, smart watches, smart clothes, smart fridges, kitchen robots, air quality sensors, weighing scales, kitchen scales, computers, light sensors, blood pressure guages, cameras,..." ],
   [ DocumentPartType.Paragraph, "diet: water and food intake, calories, macros, microelements, superfoods, diet plans, products, recepies, shops, delivery,..." ],
    [ DocumentPartType.Paragraph, "exercises: personal plans, stretching, yoga, cardio, sports, running, walks, weights lifting, pulse, breathing, posture,..." ],
   [ DocumentPartType.Paragraph, "medications: drugs, supplements, prescriptions, accessories, guides,..." ],
   [ DocumentPartType.Paragraph, "tests: blood work, x-rays, tomographies, doctor assessments, dna sequencing, self reported mood, energy levels etc.,..." ],
   [ DocumentPartType.Paragraph, "doctor: scheduling visits, managing treatments, sharing data with doctors, accessing their treatments plans,..." ],
   [ DocumentPartType.Paragraph, "AI doctor:" ],
   [ DocumentPartType.Paragraph, "and more..." ],

  [ DocumentPartType.Header, "Original goals (more vague)" ],
  [ DocumentPartType.Paragraph, "- Personalize your healthcare" ],
  [ DocumentPartType.Paragraph, "- Improve your well-being (your body's \"pace\")" ],
  [ DocumentPartType.Paragraph, "- Upgrade your \"being healthy\" standard from \"good enough\" to \"thriving\"" ],
  [ DocumentPartType.Paragraph, "(Opt-in for a health system which is build for heavily targeting your more personal metrics, such as your mood, energy, sleep, posture, strength, memory, concentration, endurance, appearance, life expectancy, etc. )" ],
  [ DocumentPartType.Paragraph, "- Provide excellent preventive healthcare to minimize reactive treatments" ],
  [ DocumentPartType.Paragraph, "- Provide latest medical knowledge to users in real time" ],
  [ DocumentPartType.Paragraph, "(Create a situation of time working in your favor. Reduce time spent on wondering, being misinformed or unaware of something, fixing some preventable mistakes and doing something harmful unknowingly)" ],
  [ DocumentPartType.Paragraph, "- Make overwhelming stuff organize and present itself to you in simple precise form" ],
  [ DocumentPartType.Paragraph, "- Do not parent adults, don't be \"patient centric\", be user centric." ],
  [ DocumentPartType.Paragraph, "Provide users with explanations of everything Bodypace recommends or does on every demand. Let users own their data. Maximize control and oversight that users have over their health." ],
  [ DocumentPartType.Paragraph, "- Handle as much data as possible in as secure as possible manner inside as clear and intuitive UI as possible with as convenient and automated usage as possible." ],
  [ DocumentPartType.Paragraph, "- Lay down the fundaments for future AI Doctor and along with robotics major healthcare automation and costs reduction." ],
  [ DocumentPartType.Paragraph, "- Decrease money, time and effort required to achieve above" ],

  [ DocumentPartType.Header, "My believes relevant to this project" ],
  [ DocumentPartType.Paragraph, "- With time technology will be increasingly more integrated with our daily lives, collecting more data about us, which will also get more personal. We need an open and trustworthy system which will store all of that data and process it." ],
  [ DocumentPartType.Paragraph, "- Medicine should not be a pay to win game where common people get basic treatments while rich have personal doctors optimizing them up." ],
  [ DocumentPartType.Paragraph, "- Medicine should not have hidden premium solutions only for people who can afford them or have excessive amounts of time to find them. Access to information about what is possible should be as open, convenient and honest (affordability) as possible" ],
  [ DocumentPartType.Paragraph, "- Medicine should not be politically correct, it should be biologically correct." ],
  [ DocumentPartType.Paragraph, "- Healthcare should push for automation, especially in the future where decades of training are required to obtain all necessary knowledge and skills to provide best health services. Technology evolves way faster than humans and all assumptions of impossible automation are probably naive." ],
  [ DocumentPartType.Paragraph, "- Treatments should deeply care about origins of current negative conditions. If those exist, assume they had to exist, and there are reasons why. Understand those and be open about your findings." ],
  [ DocumentPartType.Paragraph, "- When there is no clear understanding of what is better or worse, provide people with more options they can select from for themselves rather than force them to only one which is opinionated." ],
  [ DocumentPartType.Paragraph, "- Transhumanism is the ultimate goal of advancing medicine."],
  [ DocumentPartType.Paragraph, "- Healthcare business is special, products which could be cheap probably should be, and it's not even altruistic. Everybody says that the most important thing in life (and a key component of happiness) is health. Life is measurably better when everyone around is happier and more fulfilled. Health enables people to be more productive, creative, and create more enjoyable environments to live in. Cumulative effect of this is greater than to elevate only yourself at the expense of others, thus it's better to improve lives of many than to funnel all excessive gains to self (or I'm naive, idk)." ],
  
  [ DocumentPartType.Header,    "Overall, I know 98% of this is shit in practice and remaining 2% I develop at such a slow speed that it does not matter anyway (+AI programmer will code it all anyway faster and better in future so it's probably pointless for me to do). Primary reason behind Bodypace is learning a little bit from developing this project and I genuinely enjoy programming stuff for myself." ]
]

export default function AboutPage() {
  return <Document document={document} />;
}
