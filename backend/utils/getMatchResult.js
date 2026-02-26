export const getMatchResult = (teamScore, opponentScore) => {
      if (teamScore > opponentScore) return "w";
      if (teamScore < opponentScore) return "l";
      return "d";
    };