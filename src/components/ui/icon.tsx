import type { SVGProps } from "react";

type IconName =
  | "menu"
  | "close"
  | "arrowRight"
  | "arrowUpRight"
  | "chevronDown"
  | "chevronRight"
  | "phone"
  | "mail"
  | "mapPin"
  | "clock"
  | "calendar"
  | "users"
  | "music"
  | "bookOpen"
  | "flame"
  | "cross"
  | "sparkles"
  | "play"
  | "search"
  | "filter"
  | "check"
  | "checkCircle"
  | "external"
  | "download"
  | "send"
  | "heart"
  | "globe"
  | "share"
  | "tiktok"
  | "facebook"
  | "instagram"
  | "youtube"
  | "twitter"
  | "whatsapp";

const paths: Record<IconName, React.ReactNode> = {
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: <path d="m22 6-10 7L2 6" />,
  mapPin: <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />,
  clock: <path d="M12 6v6l4 2" />,
  calendar: <path d="M16 2v4M8 2v4M3 10h18" />,
  users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />,
  music: <path d="M9 18V5l12-2v13" />,
  bookOpen: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />,
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  cross: (
    <path d="m23 4-6-6-6 6-6-6-6 6 6 6v12h12V10l6-6z" />
  ),
  sparkles: (
    <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m15.5-6.5-2.8 2.8m-7.4 7.4-2.8 2.8m14.2 0-2.8-2.8M8 5.5 5.2 2.7" />
  ),
  play: <path d="M6 3l12 9-12 9V3z" />,
  search: <path d="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />,
  filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  check: <path d="M20 6 9 17l-5-5" />,
  checkCircle: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />,
  external: <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />,
  download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
  send: <path d="M22 2 11 13M22 2 15 22l-4-9-9-4z" />,
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  ),
  globe: <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />,
  share: <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
  tiktok: <path d="M19.5 5.5a5.3 5.3 0 0 1-1.8-3.5h-3.2v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6.05.9.13V9.16a6.2 6.2 0 0 0-.9-.06 6.3 6.3 0 1 0 6.3 6.3V9.9a8.4 8.4 0 0 0 4.1 1.13V7.8a5.3 5.3 0 0 1-3.5-2.3z" />,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  instagram: <path d="M4 4h16v16H4zM12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM17 7h.01" />,
  youtube: <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />,
  twitter: <path d="M4 4l16 16M20 4 4 20" />,
  whatsapp: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2z" />,
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  const iconPath = paths[name];
  const isFilled = name === "play" || name === "twitter" || name === "tiktok";
  return (
    <svg
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-5 w-5"}
      {...props}
    >
      {iconPath}
    </svg>
  );
}

export function SocialIcon({ name }: { name: "tiktok" | "facebook" | "instagram" | "youtube" | "twitter" | "whatsapp" }) {
  return <Icon name={name} className="h-4 w-4" />;
}