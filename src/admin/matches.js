const matches = [
  // GW1
  [
    {"teamA": "Saudi arabia", "teamB": "LOS REYES1!", "score": "2-1"},
    {"teamA": "abdo tiger", "teamB": "Bayern Munich", "score": "3-2"},
    {"teamA": "Zizozazi", "teamB": "Adamlb", "score": "3-3"},
    {"teamA": "CR flamengo", "teamB": "المدمر 33", "score": "0-3"},
    {"teamA": "Arsenal", "teamB": "FAR", "score": "0-3"},
    {"teamA": "L9irch", "teamB": "Real Madrid", "score": "10-4"},
    {"teamA": "Raja atheltic club", "teamB": "L3zwa", "score": "0-4"},
    {"teamA": "Maroc", "teamB": "Pala", "score": "6-2"},
    {"teamA": "Wydad Ac", "teamB": "Ro3b🫣", "score": "2-3"},
    {"teamA": "FC BARCELONA", "teamB": "Marseille", "score": "3-0"},
    {"teamA": "habiboff", "teamB": "Med FC", "score": "5-0"},
    {"teamA": "Stutman", "teamB": "F PES ANA SULTAN", "score": "0-8"},
    {"teamA": "7O7O", "teamB": "Hatiem", "score": "0-0"},
    {"teamA": "River Plate", "teamB": "Inter", "score": "4-2"},
    {"teamA": "T9aba", "teamB": "5yearsjail", "score": "5-1"},
    {"teamA": "العذاب اخويا العذاب", "teamB": "Mamsalich", "score": "6-0"},
    {"teamA": "Japan", "teamB": "Kolchitach", "score": "4-1"}
  ],

  // GW2
  [
    {"teamA": "FC BARCELONA", "teamB": "العذاب اخويا العذاب", "score": "2-1"},
    {"teamA": "المدمر 33", "teamB": "T9aba", "score": "3-5"},
    {"teamA": "BYE2", "teamB": "abdo tiger", "score": "3-2"},
    {"teamA": "F PES ANA SULTAN", "teamB": "Bayern Munich", "score": "3-5"},
    {"teamA": "Arsenal", "teamB": "Maroc", "score": "1-5"},
    {"teamA": "Wydad Ac", "teamB": "Pala", "score": "5-2"},
    {"teamA": "Zizozazi", "teamB": "Raja atheltic club", "score": "0-0"},
    {"teamA": "Kolchitach", "teamB": "FAR", "score": "0-0"},
    {"teamA": "Med FC", "teamB": "Marseille", "score": "3-0"},
    {"teamA": "L3zwa", "teamB": "habiboff", "score": "3-2"},
    {"teamA": "CR flamengo", "teamB": "Mamsalich", "score": "0-0"},
    {"teamA": "Ro3b🫣", "teamB": "7O7O", "score": "5-4"},
    {"teamA": "L9irch", "teamB": "Adamlb", "score": "5-3"},
    {"teamA": "LOS REYES1!", "teamB": "5yearsjail", "score": "4-0"},
    {"teamA": "Stutman", "teamB": "Saudi arabia", "score": "0-3"},
    {"teamA": "Real Madrid", "teamB": "River Plate", "score": "8-2"},
    {"teamA": "Hatiem", "teamB": "Japan", "score": "2-7"}
  ],

  // GW3
  [
    {"teamA": "Maroc", "teamB": "Saudi arabia", "score": "0-2"},
    {"teamA": "River Plate", "teamB": "FAR", "score": "0-4"},
    {"teamA": "LOS REYES1!", "teamB": "Mamsalich", "score": "3-0"}, 
    {"teamA": "L3zwa", "teamB": "CR flamengo", "score": "3-4"},
    {"teamA": "Inter", "teamB": "Bayern Munich", "score": "0-3"},
    {"teamA": "Med FC", "teamB": "Pala", "score": "1-4"},
    {"teamA": "abdo tiger", "teamB": "habiboff", "score": "0-4"},
    {"teamA": "Arsenal", "teamB": "Adamlb", "score": "5-3"},
    {"teamA": "Real Madrid", "teamB": "BYE1", "score": "3-1"},
    {"teamA": "Ro3b🫣", "teamB": "Hatiem", "score": "4-0"},
    {"teamA": "F PES ANA SULTAN", "teamB": "Zizozazi", "score": "5-3"},
    {"teamA": "L9irch", "teamB": "Stutman", "score": "3-0"},
    {"teamA": "5yearsjail", "teamB": "Raja atheltic club", "score": "3-0"},
    {"teamA": "BYE4", "teamB": "المدمر 33", "score": "1-5"},
    {"teamA": "Marseille", "teamB": "T9aba", "score": "2-4"},
    {"teamA": "FC BARCELONA", "teamB": "Wydad Ac", "score": "3-0"},
    {"teamA": "Kolchitach", "teamB": "العذاب اخويا العذاب", "score": "1-3"},
    {"teamA": "Japan", "teamB": "Inter", "score": "3-0"}
  ],

  // GW4
  [
    {"teamA": "Saudi arabia", "teamB": "Med FC", "score": "2-0"},
    {"teamA": "7O7O", "teamB": "Real Madrid", "score": "0-0"},
    {"teamA": "Inter", "teamB": "5yearsjail", "score": "0-3"},
    {"teamA": "Ro3b🫣", "teamB": "abdo tiger", "score": "2-1"},
    {"teamA": "habiboff", "teamB": "T9aba", "score": "4-6"},
    {"teamA": "L9irch", "teamB": "Adamlb", "score": "2-0"},
    {"teamA": "العذاب اخويا العذاب", "teamB": "Bayern Munich", "score": "2-4"},
    {"teamA": "Marseille", "teamB": "FAR", "score": "0-0"},
    {"teamA": "FC BARCELONA", "teamB": "F PES ANA SULTAN", "score": "2-7"},
    {"teamA": "LOS REYES1!", "teamB": "Mamsalich", "score": "3-0"},
    {"teamA": "المدمر 33", "teamB": "Arsenal", "score": "7-1"},
    {"teamA": "L3zwa", "teamB": "Pala", "score": "1-3"},
    {"teamA": "Kolchitach", "teamB": "River Plate", "score": "2-3"},
    {"teamA": "Zizozazi", "teamB": "Stutman", "score": "0-3"},
    {"teamA": "Wydad Ac", "teamB": "Maroc", "score": "2-2"},
    {"teamA": "Japan", "teamB": "Raja atheltic club", "score": "3-0"},
    {"teamA": "CR flamengo", "teamB": "Hatiem", "score": "0-0"},
  ],

  // GW5
  [
    {"teamA": "F PES ANA SULTAN", "teamB": "Stutman", "score": "5-1"},
    {"teamA": "L9irch", "teamB": "Marseille", "score": "1-3"},
    {"teamA": "L3zwa", "teamB": "LOS REYES1!", "score": "4-2"},
    {"teamA": "Maroc", "teamB": "CR flamengo", "score": "3-0"},
    {"teamA": "T9aba", "teamB": "Hatiem", "score": "7-0"}, 
    {"teamA": "العذاب اخويا العذاب", "teamB": "Pala", "score": "4-3"},
    {"teamA": "Med FC", "teamB": "Arsenal", "score": "0-2"},
    {"teamA": "Saudi arabia", "teamB": "Inter", "score": "3-0"},
    {"teamA": "River Plate", "teamB": "Ro3b🫣", "score": "0-3"},
    {"teamA": "Raja atheltic club", "teamB": "Adamlb", "score": "0-3"},
    {"teamA": "FC BARCELONA", "teamB": "Kolchitach", "score": "1-4"},
    {"teamA": "Wydad Ac", "teamB": "Bayern Munich", "score": "0-3"},
    {"teamA": "FAR", "teamB": "المدمر 33", "score": "2-5"},
    {"teamA": "5yearsjail", "teamB": "Real Madrid", "score": "1-0"},
    {"teamA": "7O7O", "teamB": "habiboff", "score": "0-3"},
    {"teamA": "abdo tiger", "teamB": "Mamsalich", "score": "3-0"}, 
    {"teamA": "Japan", "teamB": "Zizozazi", "score": "2-1"}
  ],

  // GW6
  [
    {"teamA": "River Plate", "teamB": "LOS REYES1!", "score": "2-6"},
    {"teamA": "Wydad Ac", "teamB": "L3zwa", "score": "1-3"},
    {"teamA": "Raja atheltic club", "teamB": "Ro3b🫣", "score": "2-1"},
    {"teamA": "Hatiem", "teamB": "Zizozazi", "score": "0-0"},
    {"teamA": "Adamlb", "teamB": "CR flamengo", "score": "3-0"},
    {"teamA": "7O7O", "teamB": "habiboff", "score": "0-3"},
    {"teamA": "Bayern Munich", "teamB": "5yearsjail", "score": "2-0"},
    {"teamA": "Maroc", "teamB": "FC BARCELONA", "score": "7-2"},
    {"teamA": "المدمر 33", "teamB": "F PES ANA SULTAN", "score": "2-6"},
    {"teamA": "العذاب اخويا العذاب", "teamB": "FAR", "score": "4-1"},
    {"teamA": "Saudi arabia", "teamB": "Real Madrid", "score": "3-0"},
    {"teamA": "Med FC", "teamB": "Stutman", "score": "1-3"},
    {"teamA": "L9irch", "teamB": "Kolchitach", "score": "8-0"},
    {"teamA": "Marseille", "teamB": "Inter", "score": "0-0"},
    {"teamA": "Arsenal", "teamB": "T9aba", "score": "3-7"},
    {"teamA": "Pala", "teamB": "abdo tiger", "score": "1-3"},
    {"teamA": "Japan", "teamB": "Mamsalich", "score": "3-0"}
  ],

  // GW7
  [
    {"teamA": "Marseille", "teamB": "Raja atheltic club", "score": "0-0"},
    {"teamA": "Kolchitach", "teamB": "L3zwa", "score": "0-3"},
    {"teamA": "Real Madrid", "teamB": "Wydad Ac", "score": "0-0"},
    {"teamA": "Mamsalich", "teamB": "Pala", "score": "0-0"},
    {"teamA": "L9irch", "teamB": "Arsenal", "score": "9-2"},
    {"teamA": "Inter", "teamB": "Adamlb", "score": "0-3"},
    {"teamA": "Ro3b🫣", "teamB": "FAR", "score": "4-3"},
    {"teamA": "abdo tiger", "teamB": "Med FC", "score": "5-2"},
    {"teamA": "Bayern Munich", "teamB": "7O7O", "score": "6-0"},
    {"teamA": "T9aba", "teamB": "F PES ANA SULTAN", "score": "0-5"},
    {"teamA": "CR flamengo", "teamB": "Saudi arabia", "score": "0-3"},
    {"teamA": "habiboff", "teamB": "Hatiem", "score": "3-0"},
    {"teamA": "River Plate", "teamB": "العذاب اخويا العذاب", "score": "0-3"},
    {"teamA": "FC BARCELONA", "teamB": "المدمر 33", "score": "2-7"},
    {"teamA": "Zizozazi", "teamB": "7O7O", "score": "0-0"},
    {"teamA": "Zizozazi", "teamB": "Stutman", "score": "0-3"},
    {"teamA": "5yearsjail", "teamB": "Maroc", "score": "3-2"},
    {"teamA": "LOS REYES1!", "teamB": "Japan", "score": "2-2"},
  ],

  // GW8
  [
    {"teamA": "Pala", "teamB": "Real Madrid", "score": "4-1"},
    {"teamA": "FAR", "teamB": "LOS REYES1!", "score": "0-1"},
    {"teamA": "Bayern Munich", "teamB": "Mamsalich", "score": "3-0"},
    {"teamA": "F PES ANA SULTAN", "teamB": "7O7O", "score": "3-0"},
    {"teamA": "Ro3b🫣", "teamB": "Raja atheltic club", "score": "3-0"},
    {"teamA": "Arsenal", "teamB": "habiboff", "score": "0-3"},
    {"teamA": "Adamlb", "teamB": "Saudi arabia", "score": "2-6"},
    {"teamA": "L9irch", "teamB": "abdo tiger", "score": "3-2"},
    {"teamA": "CR flamengo", "teamB": "Wydad Ac", "score": "0-3"},
    {"teamA": "Japan", "teamB": "Zizozai", "score": "1-2"},
    {"teamA": "River Plate", "teamB": "Marseille", "score": "3-0"},
    {"teamA": "Med FC", "teamB": "المدمر 33", "score": "1-7"},
    {"teamA": "L3zwa", "teamB": "Maroc", "score": "1-3"},
    {"teamA": "FC BARCELONA", "teamB": "Kolchitach", "score": "3-0"},
    {"teamA": "T9aba", "teamB": "Stutman", "score": "3-2"},
    {"teamA": "Hatiem", "teamB": "5yearsjail", "score": "0-3"},
    {"teamA": "العذاب اخويا العذاب", "teamB": "Inter", "score": "1-0"},
  ],
// Play offs
[
  {
    "teamA": "Pala",
    "teamB": "habiboff",
    "score": "2-6"
  },
  {
    "teamA": "Zizozazi",
    "teamB": "Maroc",
    "score": "3-4"
  },
  {
    "teamA": "FC Barcelona",
    "teamB": "Stutman",
    "score": "Vs"
  },
  {
    "teamA": "River Plate",
    "teamB": "Wydad Ac",
    "score": "Vs"
  },
  {
    "teamA": "5yearsJail",
    "teamB": "العذاب اخويا العذاب",
    "score": "3-7"
  },
  {
    "teamA": "FAR",
    "teamB": "Adamlb",
    "score": "2-0"
  },
  {
    "teamA": "L3zwa",
    "teamB": "Real Madrid",
    "score": "3-0"
  },
  {
    "teamA": "abdo tiger",
    "teamB": "LOS REYES",
    "score": "7-3"
  }
],
// Round of 16
[
  {
    "teamA": "FC Barcelona/stutman",
    "teamB": "Japan",
    "score": "Vs"
  },
  {
    "teamA": "Far",
    "teamB": "Saudi Arabia",
    "score": "Vs"
  },
  {
    "teamA": "habiboff",
    "teamB": "المدمر 33",
    "score": "Vs"
  },
  {
    "teamA": "Abdo tiger",
    "teamB": "ro3b",
    "score": "Vs"
  },
  {
    "teamA": "River/wydad",
    "teamB": "Bayern",
    "score": "Vs"
  },
  {
    "teamA": "Maroc",
    "teamB": "F PES ANA SULTAN",
    "score": "Vs"
  },
  {
    "teamA": "L3zwa",
    "teamB": "T9aba",
    "score": "Vs"
  },
  {
    "teamA": "L9irch",
    "teamB": "العذاب اخويا العذاب",
    "score": "Vs"
  },
], 
// Quarter
[],
// Semi
[],
// final (keep as is)
{
  teamA: 'SF1',
  teamB: 'SF2',
  score: 'Vs'
}
];

export default matches;