import type { AboutContent } from "@/types/content";

/**
 * PLACEHOLDER CONTENT (Phase 1) — see src/lib/content/services.ts for notes.
 */

export const aboutContent: AboutContent = {
  history: [
    "RCCG Place of Favour Area Headquarters is a parish of the Redeemed Christian Church of God — a family of believers devoted to the worship of God, the teaching of His word and the extension of His kingdom.",
    "Our church home is a place where lives are transformed, families are built and every member is given the opportunity to serve. [Full church history to be provided by the church office and editable from the admin dashboard.]",
  ],
  vision:
    "To build people and raise leaders who carry God's favour everywhere they go, reaching our community and the nations with the gospel of Christ.",
  mission:
    "To worship God in spirit and in truth, disciple believers through sound teaching, and plant churches and ministries that transform lives.",
  values: [
    {
      id: "val-1",
      title: "Scriptural Foundation",
      description:
        "The word of God is our final authority in all that we believe and practice.",
    },
    {
      id: "val-2",
      title: "Prayer & Faith",
      description:
        "We are a praying family who trust God for the impossible.",
    },
    {
      id: "val-3",
      title: "Excellence",
      description:
        "We serve God and people wholeheartedly, with diligence and order.",
    },
    {
      id: "val-4",
      title: "Love & Hospitality",
      description:
        "Every guest is a royal guest and every member is family.",
    },
  ],
  leadersIntro:
    "Our leadership serves the church with humility and dedication. Meet the shepherds God has placed over the house.",
  welcome:
    "Whether you are visiting for the first time or looking for a church home, you are welcome here. Come expecting to meet with God and find a family.",
  milestones: [
    {
      year: "[Year]",
      title: "Church founded",
      description:
        "The parish was established and the first service held. [Details to be confirmed.]",
    },
    {
      year: "[Year]",
      title: "Designated as Area Headquarters",
      description: "The church was commissioned to oversee parishes within the region.",
    },
    {
      year: "[Year]",
      title: "3,000 souls won to Christ",
      description: "A landmark celebration of God's faithfulness through the years.",
    },
  ],
};