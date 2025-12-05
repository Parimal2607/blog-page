import bannerImg from "@/assets/images/banner-img.png";
import authorAvatar from "@/assets/images/user-four.png";
import exploreOneImg from "@/assets/images/explor-one.png";
import exploreTwoImg from "@/assets/images/explor-two.png";
import tourGuideImgOne from "@/assets/images/user-three.png";
import tourGuideImgTwo from "@/assets/images/user-one.png";
import tourGuideImgThree from "@/assets/images/user-two.png";
import { blogPosts } from "@/data/posts";

export const DEFAULT_POST_SLUG = "full-body-workout";

export const blogHeaderData = {
  title: "The Ultimate Guide to Full-Body Workouts",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "#related-articles", isActive: true },
  ],
};

export const blogBannerData = {
  image: bannerImg,
  alt: "Blog Banner",
  width: 1000,
  height: 560,
};

export const blogContentData = {
  author: {
    name: "Alex Carter",
    avatar: authorAvatar,
    date: "23 January 2025",
  },
  introParagraphs: [
    "Discover exercises that target every muscle group, helping you build strength and endurance. Perfect for beginners and seasoned gym-goers alike.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus",
    "mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus",
  ],
  highlight:
    "With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his motivational style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures.",
  bodyParagraphs: [
    "With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his motivational style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus",
    "mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus",
    "mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus",
  ],
};

export const blogSliderData = {
  title: "About Alex Carter",
  authorName: "Alex Carter",
  avatar: authorAvatar,
  slides: [
    {
      id: "slide-1",
      description:
        "With over a decade in fitness, Alex specializes in strength training. Certified by NASM, he designs challenging yet achievable workout programs tailored to every skill level.",
    },
    {
      id: "slide-2",
      description:
        "Alex is known for his motivational coaching style and focus on proper form. He loves helping clients discover their potential through focused routines and measured progress.",
    },
    {
      id: "slide-3",
      description:
        "Outside the gym, Alex is an avid runner who enjoys exploring new trails. He believes balance comes from combining structured training with time spent outdoors.",
    },
  ],
  links: {
    previous: {
      label: "Previous",
      description: "5 Tips for Better Cardio Sessions",
    },
    next: {
      label: "Next",
      description: "Meal Prep Basics for Gym Enthusiasts",
    },
  },
};

export const exploreMorePosts = [
  {
    id: "explore-1",
    title: "Culinary",
    date: "13 Jun 2022",
    description: "Two women in local stand are chatting during morning.",
    image: exploreOneImg,
    alt: "Local culinary stand",
  },
  {
    id: "explore-2",
    title: "Travel",
    date: "22 Jul 2022",
    description: "Enjoying the sunset on Padar island together",
    image: exploreOneImg,
    alt: "Travelers enjoying sunset",
  },
  {
    id: "explore-3",
    title: "Travel",
    date: "22 Jul 2022",
    description: "The lush green surroundings of the campgrounds create a..",
    image: exploreTwoImg,
    alt: "Campground scenery",
  },
];

export const tourGuidesData = [
  {
    id: "guide-1",
    name: "Miranda Rachel",
    location: "Jombang, Jawa timur",
    ratingLabel: "(4.8)",
    ratingType: "four",
    image: tourGuideImgOne,
  },
  {
    id: "guide-2",
    name: "Danielle Marsh",
    location: "Wonosobo, Jawa ten..",
    ratingLabel: "(4.8)",
    ratingType: "four",
    image: tourGuideImgTwo,
  },
  {
    id: "guide-3",
    name: "Kang Haerin",
    location: "Bandung, Jawa barat",
    ratingLabel: "(4.8)",
    ratingType: "five",
    image: tourGuideImgThree,
  },
];

const initialCommentsBySlug = {
  [DEFAULT_POST_SLUG]: [
    {
      id: "comment-1",
      postSlug: DEFAULT_POST_SLUG,
      name: "Kang Haerin",
      source: "seed",
      date: "22 Jul 2022",
      ratingValue: 5,
      text: "this blog is very helpful and i learned a lot from it I highly recommend it to anyone looking to improve their fitness",
      image: tourGuideImgThree,
      reactionId: "good",
    },
    {
      id: "comment-2",
      postSlug: DEFAULT_POST_SLUG,
      name: "kattty pal",
      source: "seed",
      date: "22 Jul 2022",
      ratingValue: 5,
      text: "I love the tips and tricks in this blog, they are very helpful and easy to follow",
      image: tourGuideImgThree,
      reactionId: "good",
    },
  ],
};

const defaultCommentTemplates = [
  {
    idSuffix: "a",
    name: "Jamie Park",
    reactionId: "good",
    ratingValue: 5,
    text: (title) =>
      `Loved how this breaks down ${title.toLowerCase()}. I tried the tips this morning and the flow felt so much smoother.`,
  },
  {
    idSuffix: "b",
    name: "Miguel Santos",
    reactionId: "nice",
    ratingValue: 4,
    text: (title) =>
      `Thanks for the practical advice on ${title.toLowerCase()}. Bookmarking this so I can revisit before my next session.`,
  },
];

blogPosts.forEach((post) => {
  if (!initialCommentsBySlug[post.slug]) {
    initialCommentsBySlug[post.slug] = defaultCommentTemplates.map(
      (template, index) => ({
        id: `comment-${post.slug}-${template.idSuffix}`,
        postSlug: post.slug,
        name: template.name,
        source: "seed",
        date: "05 Dec 2025",
        ratingValue: template.ratingValue,
        text: template.text(post.title),
        image: tourGuideImgThree,
        reactionId: template.reactionId,
      })
    );
  }
});

export const commentsBySlug = initialCommentsBySlug;

export const relatedArticlesData = blogPosts.map((post) => ({
  id: post.slug,
  slug: post.slug,
  title: post.title,
  description: post.cardDescription || post.excerpt,
  author: post.author,
  image: post.cardImage || post.hero,
  alt: post.cardAlt || post.heroAlt || post.title,
}));

