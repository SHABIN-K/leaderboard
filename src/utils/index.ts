type ScoreItem = {
  name: string;
  point: number;
};

const groupScore: ScoreItem[] = [
  { name: "First", point: 10 },
  { name: "Second", point: 5 },
  { name: "Third", point: 3 },
];

const individualScore: ScoreItem[] = [
  { name: "First", point: 5 },
  { name: "Second", point: 3 },
  { name: "Third", point: 1 },
];

export const teamData = [
  { name: "പഞ്ചവാദ്യം", link: "panchavadyam" },
  { name: "പടയണി", link: "padayani" },
  { name: "തെയ്യം", link: "theyyam" },
  { name: "കുമ്മാട്ടി", link: "kummati" },
];

export const departmentData = [
  { name: "BCA" },
  { name: "Psychology" },
  { name: "Political Science" },
  { name: "English" },
  { name: "History" },
  { name: "Economics" },
  { name: "Maths" },
  { name: "MSW" },
  { name: "M.com" },
  { name: "MA English" },
  { name: "BSW" },
  { name: "BBA" },
  { name: "B.com Finance" },
  { name: "B.com CA" },
  { name: "B.com Co-operation" },
];

export const itemsData = [
  { name: "Oppana", prize: groupScore },
  { name: "Dance", prize: groupScore },
  { name: "Duff Mutt", prize: groupScore },
  { name: "Kathakali", prize: individualScore },
  { name: "Light Music", prize: individualScore },
  { name: "Clasical Music", prize: individualScore },
  { name: "Mappilappattu", prize: individualScore },
  { name: "Recitation", prize: individualScore },
  { name: "Vocal-Western", prize: individualScore },
  { name: "Bharathanatyam", prize: individualScore },
  { name: "Folk Dance", prize: individualScore },
  { name: "Mono Act", prize: individualScore },
  { name: "Mimicry", prize: individualScore },
  { name: "Keralanatanam", prize: individualScore },
  { name: "Stringed insturment(Western)", prize: individualScore },
  { name: "Group Song (Indian)", prize: groupScore },
  { name: "Group Song (Western)", prize: groupScore },
  { name: "Mappilappattu (Group)", prize: groupScore },
  { name: "Vocal-Folk (Group)", prize: groupScore },
  { name: "Patriotic Song", prize: groupScore },
  { name: "Ganamela", prize: groupScore },
  { name: "Kolkali ", prize: groupScore },
  { name: "Vattapattu", prize: groupScore },
  { name: "Margamkali", prize: groupScore },
  { name: "Folk Group", prize: groupScore },
  { name: "Drama", prize: groupScore },
  { name: "Mime", prize: groupScore },
  { name: "Skit", prize: groupScore },
  { name: "Arabana", prize: groupScore },
  { name: "Water Color", prize: individualScore },
  { name: "Oil Color", prize: individualScore },
  { name: "Pencil Drawing", prize: individualScore },
  { name: "Cartoon Drawing", prize: individualScore },
  { name: "Kavyakeli", prize: individualScore },
  { name: "Rangoli", prize: individualScore },
  { name: "Collage", prize: individualScore },
  { name: "Spot Photography", prize: individualScore },
  { name: "Clay Modelling", prize: individualScore },
  { name: "Embroidery", prize: individualScore },
  { name: "Poster Making", prize: individualScore },
  { name: "Essay Writing", prize: individualScore },
  { name: "Short Story Writing", prize: individualScore },
  { name: "Versification", prize: individualScore },
  { name: "Elocution", prize: individualScore },
  { name: "Quiz", prize: individualScore },
  { name: "Debate", prize: individualScore },
];

export const prizeData = [
  { name: "First" },
  { name: "Second" },
  { name: "Third" },
];
