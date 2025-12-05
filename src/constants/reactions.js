import {
  AngeryEmojiIcon,
  HappyEmojiIcon,
  SadEmojiIcon,
  SmileEmojiIcon,
  StarEmjoyIcon,
} from "@/components/common/Icons";

export const reactionOptions = [
  {
    id: "bad",
    label: "Bad",
    Icon: AngeryEmojiIcon,
    color: "#FF0412",
    rating: 1,
  },
  {
    id: "average",
    label: "Average",
    Icon: SadEmojiIcon,
    color: "#FF6700",
    rating: 2,
  },
  {
    id: "normal",
    label: "Normal",
    Icon: SmileEmojiIcon,
    color: "#FFB416",
    rating: 3,
  },
  {
    id: "nice",
    label: "Nice",
    Icon: HappyEmojiIcon,
    color: "#1C9AF4",
    rating: 4,
  },
  {
    id: "good",
    label: "Good",
    Icon: StarEmjoyIcon,
    color: "#00BA5C",
    rating: 5,
  },
];

export const reactionMeta = reactionOptions.reduce((acc, reaction) => {
  acc[reaction.id] = reaction;
  return acc;
}, {});

