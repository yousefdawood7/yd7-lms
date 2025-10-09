import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type CardType = {
  logo: string;
  title: string;
  description: string;
};

const cardList: CardType[] = [
  {
    logo: "📚",
    title: "Comprehensive Course",
    description:
      "Dive deep into the world of knowledge with our extensive course offerings.",
  },

  {
    logo: "🎮",
    title: "Interactive Learning",
    description:
      "Engage with our courses through interactive content and hands-on projects.",
  },

  {
    logo: "🧑‍💻",
    title: "Progress Tracking",
    description:
      "Monitor your progress with our advanced tracking features and stay motivated.",
  },

  {
    logo: "🧠",
    title: "Community Support",
    description:
      "Join a vibrant community of learners and get support from peers and instructors.",
  },
];

export default function CardList() {
  return (
    <>
      {cardList.map((card, index) => (
        <Card
          key={index}
          className="max-w-sm p-3.5 transition-transform hover:-translate-y-2.5"
        >
          <CardTitle className="space-y-3">
            <p className="text-2xl">{card.logo}</p>
            <p className="text-2xl">{card.title}</p>
          </CardTitle>
          <CardDescription className="text-lg">
            {card.description}
          </CardDescription>
        </Card>
      ))}
    </>
  );
}
