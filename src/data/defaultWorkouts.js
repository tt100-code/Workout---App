export const defaultWorkouts = [
  {
    id: 'default-push',
    name: 'Push Day',
    emoji: '💪',
    createdAt: new Date().toISOString(),
    exercises: [
      { id: 'p1', name: 'Bankdrücken', sets: 4, reps: 8, restSecs: 120 },
      { id: 'p2', name: 'Schrägbankdrücken', sets: 3, reps: 10, restSecs: 90 },
      { id: 'p3', name: 'Schulterdrücken', sets: 3, reps: 10, restSecs: 90 },
      { id: 'p4', name: 'Seitheben', sets: 3, reps: 15, restSecs: 60 },
      { id: 'p5', name: 'Trizepsdrücken', sets: 3, reps: 12, restSecs: 60 },
    ],
  },
  {
    id: 'default-pull',
    name: 'Pull Day',
    emoji: '🔙',
    createdAt: new Date().toISOString(),
    exercises: [
      { id: 'pu1', name: 'Klimmzüge', sets: 4, reps: 8, restSecs: 120 },
      { id: 'pu2', name: 'Langhantelrudern', sets: 3, reps: 10, restSecs: 90 },
      { id: 'pu3', name: 'Kabelzug-Rudern', sets: 3, reps: 12, restSecs: 90 },
      { id: 'pu4', name: 'Facepulls', sets: 3, reps: 15, restSecs: 60 },
      { id: 'pu5', name: 'Bizepscurls', sets: 3, reps: 12, restSecs: 60 },
    ],
  },
  {
    id: 'default-leg',
    name: 'Leg Day',
    emoji: '🦵',
    createdAt: new Date().toISOString(),
    exercises: [
      { id: 'l1', name: 'Kniebeugen', sets: 4, reps: 8, restSecs: 150 },
      { id: 'l2', name: 'Beinpresse', sets: 3, reps: 10, restSecs: 120 },
      { id: 'l3', name: 'Rumänisches Kreuzheben', sets: 3, reps: 10, restSecs: 90 },
      { id: 'l4', name: 'Beinstrecker', sets: 3, reps: 12, restSecs: 60 },
      { id: 'l5', name: 'Wadenheben', sets: 4, reps: 15, restSecs: 60 },
    ],
  },
]
