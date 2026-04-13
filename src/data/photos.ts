export interface Photo {
  src: string;
  alt: string;
  caption?: string;
  year?: string;
}

export const photos: Photo[] = [
  { src: "/images/photos/shibuya.jpg", alt: "Shibuya street" },
  { src: "/images/photos/beach.jpg", alt: "Standing at the beach" },
  { src: "/images/photos/clay-art.jpg", alt: "Clay art piece" },
  { src: "/images/photos/four-friends.jpg", alt: "Four friends" },
  { src: "/images/photos/restaurant.jpg", alt: "At a restaurant" },
  { src: "/images/photos/group-restaurant.jpg", alt: "Group at a restaurant" },
  { src: "/images/photos/outside.jpg", alt: "Outside with friends" },
  { src: "/images/photos/cafe.jpg", alt: "At a cafe" },
  { src: "/images/photos/friends-night.jpg", alt: "Friends at night" },
  { src: "/images/pfp2.jpg", alt: "Michael Yao" },
  { src: "/images/pfp.jpg", alt: "Michael Yao" },
];
