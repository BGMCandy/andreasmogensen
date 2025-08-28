export type Star = {
    x: number; y: number;
    size?: number;
    color?: string;
    glowColor?: string;
    title?: string;
    description?: string;
    infoPosition?: "left" | "right" | "top" | "bottom";
    hoverScale?: number;
    flickerDuration?: number;
  };
  
  export type ClusterData = { stars: Star[]; };
  
  const esaFactsCluster: ClusterData = {
    stars: [
      {
        x: 10, y: 15, size: 10,
        color: "#f0e68c", glowColor: "rgba(240, 230, 140, 0.4)",
        title: "Founded in 1975",
        description: "Created by merging ESRO and ELDO to coordinate European space efforts.",
        infoPosition: "right", hoverScale: 1.2, flickerDuration: 2.5,
      },
      {
        x: 30, y: 25, size: 9,
        color: "#add8e6", glowColor: "rgba(173, 216, 230, 0.4)",
        title: "23 Member States",
        description: "ESA is composed of 23 European Member States pooling financial & intellectual resources.",
        infoPosition: "bottom", hoverScale: 1.15, flickerDuration: 2.8,
      },
      {
        x: 50, y: 20, size: 11,
        color: "#ffb6c1", glowColor: "rgba(255,182,193,0.35)",
        title: "HQ in Paris & Major Centers",
        description: "Headquarters in Paris; centers include EAC (Germany), ESAC (Spain), ESOC (Germany), ESRIN (Italy), ESTEC (Netherlands), ECSAT (UK).",
        infoPosition: "left", hoverScale: 1.25, flickerDuration: 3.0,
      },
      {
        x: 70, y: 30, size: 10,
        color: "#98fb98", glowColor: "rgba(152,251,152,0.4)",
        title: "2025 Budget: ~€7.7 B",
        description: "Annual budget for 2025 is approximately €7.7 billion to drive programmes & missions.",
        infoPosition: "top", hoverScale: 1.2, flickerDuration: 2.6,
      },
      {
        x: 30, y: 50, size: 9,
        color: "#dda0dd", glowColor: "rgba(221,160,221,0.4)",
        title: "Copernicus Programme",
        description: "Comprehensive Earth-observation initiative, including Sentinel satellites operating across land, sea, and atmosphere.",
        infoPosition: "right", hoverScale: 1.18, flickerDuration: 2.9,
      },
      {
        x: 55, y: 55, size: 10,
        color: "#87ceeb", glowColor: "rgba(135,206,235,0.35)",
        title: "Ariane Launchers & Spaceport",
        description: "Operates Ariane rockets; main launch site is Kourou in French Guiana—Guiana Space Centre.",
        infoPosition: "left", hoverScale: 1.22, flickerDuration: 2.7,
      },
    ],
  };
  
  export default esaFactsCluster;