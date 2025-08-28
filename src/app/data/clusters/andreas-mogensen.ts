export type Star = {
    x: number; // 0–100 (%)
    y: number; // 0–100 (%)
    size?: number; // px
    color?: string; // hex
    glowColor?: string; // rgba recommended
    title?: string;
    description?: string; // supports short HTML
    infoPosition?: "right" | "left" | "top" | "bottom";
    hoverScale?: number;
    flickerDuration?: number; // seconds
  };
  
  export type ClusterData = {
    stars: Star[];
  };
  
  const mogensenCluster: ClusterData = {
    stars: [
      {
        x: 18,
        y: 22,
        size: 10,
        color: "#ffffff",
        glowColor: "rgba(80, 160, 255, 0.35)",
        title: "First Dane in Space (2015)",
        description:
          "Andreas Mogensen became Denmark’s first astronaut during ESA’s <em>Iriss</em> mission, a ~10-day stay on the ISS.",
        infoPosition: "right",
        hoverScale: 1.25,
        flickerDuration: 2.4,
      },
      {
        x: 34,
        y: 38,
        size: 9,
        color: "#d6ecff",
        glowColor: "rgba(120, 180, 255, 0.35)",
        title: "Soyuz TMA-18M Launch",
        description:
          "Launched from Baikonur Cosmodrome; rendezvoused with the ISS after ~36 orbits.",
        infoPosition: "bottom",
        hoverScale: 1.2,
        flickerDuration: 3.1,
      },
      {
        x: 58,
        y: 18,
        size: 11,
        color: "#fff8e7",
        glowColor: "rgba(255, 210, 140, 0.28)",
        title: "SpaceX Crew-7 Pilot (2023–24)",
        description:
          "Returned to orbit as pilot of Crew-7 for a ~6-month expedition aboard the ISS.",
        infoPosition: "left",
        hoverScale: 1.3,
        flickerDuration: 2.1,
      },
      {
        x: 76,
        y: 30,
        size: 12,
        color: "#ffffff",
        glowColor: "rgba(90, 200, 255, 0.35)",
        title: "ISS Expedition 70 Commander",
        description:
          "Took command of the ISS during Expedition 70—first Dane to command the Station.",
        infoPosition: "left",
        hoverScale: 1.28,
        flickerDuration: 2.7,
      },
      {
        x: 66,
        y: 55,
        size: 8,
        color: "#e8f4ff",
        glowColor: "rgba(120, 180, 255, 0.28)",
        title: "Education",
        description:
          "MSc Aeronautics (Imperial College London) and PhD Aerospace Engineering (UT Austin).",
        infoPosition: "top",
        hoverScale: 1.15,
        flickerDuration: 3.4,
      },
      {
        x: 42,
        y: 62,
        size: 7,
        color: "#ffffff",
        glowColor: "rgba(255, 255, 255, 0.2)",
        title: "Selected by ESA (2009)",
        description:
          "Chosen as an ESA astronaut in May 2009; completed basic training in 2010.",
        infoPosition: "right",
        hoverScale: 1.15,
        flickerDuration: 2.9,
      },
      {
        x: 22,
        y: 74,
        size: 9,
        color: "#f0f6ff",
        glowColor: "rgba(160, 200, 255, 0.25)",
        title: "Interests & Training",
        description:
          "Qualified for spacewalks in EMU & Orlan suits; enjoys adventure sports like diving and mountaineering.",
        infoPosition: "top",
        hoverScale: 1.18,
        flickerDuration: 3.0,
      },
      {
        x: 82,
        y: 80,
        size: 10,
        color: "#ffffff",
        glowColor: "rgba(180, 220, 255, 0.35)",
        title: "Mission Science",
        description:
          "Exp. 70 research included sleep, immune system, water filtration, and VR experiments.",
        infoPosition: "left",
        hoverScale: 1.22,
        flickerDuration: 2.2,
      },
    ],
  };
  
  export default mogensenCluster;