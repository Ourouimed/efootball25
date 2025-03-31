const matches = [
    // GW1
    [
      {"teamA": "Saudi arabia", "teamB": "LOS REYES1!", "score": "2-1"},
      {"teamA": "abdo tiger", "teamB": "Bayern Munich", "score": "3-2"},
      {"teamA": "Zizozazi", "teamB": "Adamlb", "score": "3-3"},
      {"teamA": "CR flamengo", "teamB": "المدمر 33", "score": "0-3"},
      {"teamA": "Arsenal", "teamB": "FAR", "score": "0-3"},
      {"teamA": "L9irch", "teamB": "Real Madrid", "score": "10-4"},
      {"teamA": "Raja atheltic club", "teamB": "L3zwa", "score": "4-0"},
      {"teamA": "Maroc", "teamB": "Pala", "score": "6-2"},
      {"teamA": "Wydad Ac", "teamB": "Ro3b🫣", "score": "2-3"},
      {"teamA": "FC BARCELONA", "teamB": "Marseille", "score": "Vs"},
      {"teamA": "habiboff", "teamB": "Med FC", "score": "5-0"},
      {"teamA": "Stutman", "teamB": "F PES ANA SULTAN", "score": "Vs"},
      {"teamA": "7O7O", "teamB": "Hatiem", "score": "Vs"},
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
      {"teamA": "Arsenal", "teamB": "Maroc", "score": "5-1"},
      {"teamA": "Wydad Ac", "teamB": "Pala", "score": "5-2"},
      {"teamA": "Zizozazi", "teamB": "Raja atheltic club", "score": "Vs"},
      {"teamA": "Kolchitach", "teamB": "FAR", "score": "Vs"},
      {"teamA": "Med FC", "teamB": "Marseille", "score": "Vs"},
      {"teamA": "L3zwa", "teamB": "habiboff", "score": "3-2"},
      {"teamA": "CR flamengo", "teamB": "Mamsalich", "score": "Vs"},
      {"teamA": "Ro3b🫣", "teamB": "7O7O", "score": "5-4"},
      {"teamA": "L9irch", "teamB": "Adamlb", "score": "Vs"},
      {"teamA": "LOS REYES1!", "teamB": "5yearsjail", "score": "Vs"},
      {"teamA": "Stutman", "teamB": "Saudi arabia", "score": "Vs"},
      {"teamA": "Real Madrid", "teamB": "River Plate", "score": "8-2"},
      {"teamA": "Hatiem", "teamB": "Japan", "score": "2-7"}
    ],
  
    // GW3
    [
      {"teamA": "Maroc", "teamB": "Saudi arabia", "score": "Vs"},
      {"teamA": "River Plate", "teamB": "FAR", "score": "0-4"},
      {"teamA": "LOS REYES1!", "teamB": "Mamsalich", "score": "Vs"}, 
      {"teamA": "L3zwa", "teamB": "CR flamengo", "score": "3-4"},
      {"teamA": "Inter", "teamB": "Bayern Munich", "score": "Vs"},
      {"teamA": "Med FC", "teamB": "Pala", "score": "1-4"},
      {"teamA": "abdo tiger", "teamB": "habiboff", "score": "0-4"},
      {"teamA": "Arsenal", "teamB": "Adamlb", "score": "5-3"},
      {"teamA": "Real Madrid", "teamB": "7O7O", "score": "Vs"},
      {"teamA": "Ro3b🫣", "teamB": "Hatiem", "score": "4-0"},
      {"teamA": "F PES ANA SULTAN", "teamB": "Zizozazi", "score": "Vs"},
      {"teamA": "L9irch", "teamB": "Stutman", "score": "Vs"},
      {"teamA": "5yearsjail", "teamB": "Raja atheltic club", "score": "Vs"},
      {"teamA": "BYE4", "teamB": "المدمر 33", "score": "1-5"},
      {"teamA": "Marseille", "teamB": "T9aba", "score": "2-4"},
      {"teamA": "FC BARCELONA", "teamB": "Wydad Ac", "score": "Vs"},
      {"teamA": "Kolchitach", "teamB": "العذاب اخويا العذاب", "score": "1-3"},
      {"teamA": "Japan", "teamB": "Inter", "score": "Vs"}
    ],
  
    // GW4
    [
      {"teamA": "Saudi arabia", "teamB": "Med FC", "score": "2°0"},
      {"teamA": "7O7O", "teamB": "Real Madrid", "score": "Vs"},
      {"teamA": "Inter", "teamB": "5yearsjail", "score": "Vs"},
      {"teamA": "Ro3b🫣", "teamB": "abdo tiger", "score": "2-1"},
      {"teamA": "habiboff", "teamB": "T9aba", "score": "4-6"},
      {"teamA": "L9irch", "teamB": "Adamlb", "score": "2-0"},
      {"teamA": "العذاب اخويا العذاب", "teamB": "Bayern Munich", "score": "2-4"},
      {"teamA": "Marseille", "teamB": "FAR", "score": "Vs"},
      {"teamA": "FC BARCELONA", "teamB": "F PES ANA SULTAN", "score": "2-7"},
      {"teamA": "LOS REYES1!", "teamB": "Mamsalich", "score": "Vs"},
      {"teamA": "المدمر 33", "teamB": "Arsenal", "score": "7-1"},
      {"teamA": "L3zwa", "teamB": "Pala", "score": "1-3"},
      {"teamA": "Kolchitach", "teamB": "River Plate", "score": "2-3"},
      {"teamA": "Zizozazi", "teamB": "Stutman", "score": "Vs"},
      {"teamA": "Wydad Ac", "teamB": "Maroc", "score": "2-2"},
      {"teamA": "Japan", "teamB": "Raja atheltic club", "score": "Vs"},
      {"teamA": "CR flamengo", "teamB": "Hatiem", "score": "Vs"},
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
      {"teamA": "Saudi arabia", "teamB": "Inter", "score": "Vs"},
      {"teamA": "River Plate", "teamB": "Ro3b🫣", "score": "Vs"},
      {"teamA": "Raja atheltic club", "teamB": "Adamlb", "score": "Vs"},
      {"teamA": "FC BARCELONA", "teamB": "Kolchitach", "score": "1-4"},
      {"teamA": "Wydad Ac", "teamB": "Bayern Munich", "score": "Vs"},
      {"teamA": "FAR", "teamB": "المدمر 33", "score": "2-5"},
      {"teamA": "5yearsjail", "teamB": "Real Madrid", "score": "Vs"},
      {"teamA": "7O7O", "teamB": "habiboff", "score": "Vs"},
      {"teamA": "abdo tiger", "teamB": "Mamsalich", "score": "Vs"}, 
      {"teamA": "Japan", "teamB": "Zizozazi", "score": "2-1"}
    ],
  
    // GW6
    [
      {"teamA": "River Plate", "teamB": "LOS REYES1!", "score": "Vs"},
      {"teamA": "Wydad Ac", "teamB": "L3zwa", "score": "1-3"},
      {"teamA": "Raja atheltic club", "teamB": "Ro3b🫣", "score": "Vs"},
      {"teamA": "Hatiem", "teamB": "Zizozazi", "score": "Vs"},
      {"teamA": "Adamlb", "teamB": "CR flamengo", "score": "3-0"},
      {"teamA": "7O7O", "teamB": "habiboff", "score": "Vs"},
      {"teamA": "Bayern Munich", "teamB": "5yearsjail", "score": "Vs"},
      {"teamA": "Maroc", "teamB": "FC BARCELONA", "score": "Vs"},
      {"teamA": "المدمر 33", "teamB": "F PES ANA SULTAN", "score": "2-6"},
      {"teamA": "العذاب اخويا العذاب", "teamB": "FAR", "score": "4-1"},
      {"teamA": "Saudi arabia", "teamB": "Real Madrid", "score": "Vs"},
      {"teamA": "Med FC", "teamB": "Stutman", "score": "1-3"},
      {"teamA": "L9irch", "teamB": "Kolchitach", "score": "8-0"},
      {"teamA": "Marseille", "teamB": "Inter", "score": "Vs"},
      {"teamA": "Arsenal", "teamB": "T9aba", "score": "3-7"},
      {"teamA": "Pala", "teamB": "abdo tiger", "score": "1-3"},
      {"teamA": "Japan", "teamB": "Mamsalich", "score": "Vs"}
    ],
  
    // GW7
    [
      {"teamA": "Marseille", "teamB": "Raja atheltic club", "score": "Vs"},
      {"teamA": "Kolchitach", "teamB": "L3zwa", "score": "0-3"},
      {"teamA": "Real Madrid", "teamB": "Wydad Ac", "score": "Vs"},
      {"teamA": "Mamsalich", "teamB": "Pala", "score": "Vs"},
      {"teamA": "L9irch", "teamB": "Arsenal", "score": "Vs"},
      {"teamA": "Inter", "teamB": "Adamlb", "score": "Vs"},
      {"teamA": "Ro3b🫣", "teamB": "FAR", "score": "4-3"},
      {"teamA": "abdo tiger", "teamB": "Med FC", "score": "5-2"},
      {"teamA": "Bayern Munich", "teamB": "7O7O", "score": "Vs"},
      {"teamA": "T9aba", "teamB": "F PES ANA SULTAN", "score": "0-5"},
      {"teamA": "CR flamengo", "teamB": "Saudi arabia", "score": "Vs"},
      {"teamA": "habiboff", "teamB": "Hatiem", "score": "Vs"},
      {"teamA": "River Plate", "teamB": "العذاب اخويا العذاب", "score": "Vs"},
      {"teamA": "FC BARCELONA", "teamB": "المدمر 33", "score": "2-7"},
      {"teamA": "Zizozazi", "teamB": "Stutman", "score": "Vs"},
      {"teamA": "5yearsjail", "teamB": "Maroc", "score": "Vs"},
      {"teamA": "LOS REYES1!", "teamB": "Japan", "score": "2-2"},
    ],
  
    // GW8
    [
      {"teamA": "Pala", "teamB": "Real Madrid", "score": "4-1"},
      {"teamA": "FAR", "teamB": "LOS REYES1!", "score": "Vs"},
      {"teamA": "Bayern Munich", "teamB": "Mamsalich", "score": "Vs"},
      {"teamA": "F PES ANA SULTAN", "teamB": "7O7O", "score": "Vs"},
      {"teamA": "Ro3b🫣", "teamB": "Raja atheltic club", "score": "Vs"},
      {"teamA": "Arsenal", "teamB": "habiboff", "score": "Vs"},
      {"teamA": "Adamlb", "teamB": "Saudi arabia", "score": "Vs"},
      {"teamA": "L9irch", "teamB": "abdo tiger", "score": "Vs"},
      {"teamA": "CR flamengo", "teamB": "Wydad Ac", "score": "Vs"},
      {"teamA": "Japan", "teamB": "Zizozai", "score": "1-2"},
      {"teamA": "River Plate", "teamB": "Marseille", "score": "Vs"},
      {"teamA": "Med FC", "teamB": "المدمر 33", "score": "1-7"},
      {"teamA": "L3zwa", "teamB": "Maroc", "score": "1-3"},
      {"teamA": "FC BARCELONA", "teamB": "Kolchitach", "score": "Vs"},
      {"teamA": "T9aba", "teamB": "Stutman", "score": "3-2"},
      {"teamA": "Hatiem", "teamB": "5yearsjail", "score": "Vs"},
      {"teamA": "العذاب اخويا العذاب", "teamB": "Inter", "score": "1-0"},
    ],
  // Play offs
  [],
  // Round of 16
  [], 
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