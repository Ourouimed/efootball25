const teams = [
    {
        teamName: 'FC BARCELONA',
        teamId: 'RAPHAA',
        GF: 15,
        GA: 28,
        wins: 4,
        draws: 0,
        losses: 4,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Raja atheltic club',
        teamId: 'Lamtiri',
        GF: 2,
        GA: 17,
        wins: 1,
        draws: 0,
        losses: 7,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'F PES ANA SULTAN',
        teamId: 'KAIDO_MORRI',
        GF: 42,
        GA: 13,
        wins: 7,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'المدمر 33',
        teamId: 'NO9TA',
        GF: 39,
        GA: 14,
        wins: 6,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Mamsalich',
        teamId: 'Mamsalich',
        GF: 0,
        GA: 21,
        wins: 0,
        draws: 2,
        losses: 6,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Ro3b🫣',
        teamId: 'To9os ifri9ya',
        GF: 24,
        GA: 13,
        wins: 7,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'العذاب اخويا العذاب',
        teamId: 'Mehdi-rhou',
        GF: 24,
        GA: 11,
        wins: 6,
        draws: 0,
        losses: 2,
        KOGF : 7 ,
        KOGA : 3
    }
    ,
    {
        teamName: 'Med Fc',
        teamId: 'Medox24',
        GF: 8,
        GA: 28,
        wins: 1,
        draws: 0,
        losses: 7,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'L9irch',
        teamId: '_monceff__',
        GF: 41,
        GA: 14,
        wins: 7,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
    ,{
        teamName: 'abdo tiger',
        teamId: 'Tammar',
        GF: 19,
        GA: 24,
        wins: 4,
        draws: 0,
        losses: 4,
        KOGF : 7 ,
        KOGA : 3
    },
    {
        teamName: 'Maroc',
        teamId: 'Hamza El almi',
        GF: 28,
        GA: 13,
        wins: 5,
        draws: 1,
        losses: 2,
        KOGF : 4 ,
        KOGA : 3
    },
    {
        teamName: 'LOS REYES1!',
        teamId: 'Wassiim_the_reaaal',
        GF: 22,
        GA: 10,
        wins: 5,
        draws: 1,
        losses: 2,
        KOGF : 3 ,
        KOGA : 7
    } ,
    {
        teamName: 'L3zwa',
        teamId: 'pop',
        GF: 22,
        GA: 15,
        wins: 5,
        draws: 0,
        losses: 3,
        KOGF : 3 ,
        KOGA : 0
    },
    {
        teamName: 'T9aba',
        teamId: 'Fost3er',
        GF: 37,
        GA: 15,
        wins: 7,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Bayern Munich',
        teamId: 'SVG AS FUCK',
        GF: 28,
        GA: 7,
        wins: 7,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Stutman',
        teamId: 'Reda',
        GF: 12,
        GA: 23,
        wins: 3,
        draws: 0,
        losses: 5,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'River Plate',
        teamId: 'Ostora9',
        GF: 14,
        GA: 28,
        wins: 3,
        draws: 0,
        losses: 5,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: '7O7O',
        teamId: 'Imad',
        GF: 4,
        GA: 20,
        wins: 0,
        draws: 2,
        losses: 6,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Arsenal',
        teamId: 'ernesto_III',
        GF: 11,
        GA: 37,
        wins: 2,
        draws: 0,
        losses: 6,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'habiboff',
        teamId: 'habiboff',
        GF: 27,
        GA: 9,
        wins: 6,
        draws: 0,
        losses: 2,
        KOGF : 6 ,
        KOGA : 2
    }
    ,
    {
        teamName: 'Adamlb',
        teamId: 'Adamlb',
        GF: 19,
        GA: 19,
        wins: 2,
        draws: 1,
        losses: 5,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Hatiem',
        teamId: 'Cactushtiem',
        GF: 2,
        GA: 24,
        wins: 0,
        draws: 2,
        losses: 6,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'FAR',
        teamId: 'Tareeq_uar',
        GF: 12,
        GA: 9,
        wins: 2,
        draws: 2,
        losses: 4,
        KOGF : 2 ,
        KOGA : 0
    },
    {
        teamName: 'Marseille',
        teamId: 'M.B',
        GF: 5,
        GA: 14,
        wins: 1,
        draws: 3,
        losses: 4,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'CR flamengo',
        teamId: 'M_47',
        GF: 7,
        GA: 18,
        wins: 1,
        draws: 2,
        losses: 5,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Real Madrid',
        teamId: 'Adam',
        GF: 15,
        GA: 20,
        wins: 2,
        draws: 2,
        losses: 4,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Pala',
        teamId: 'PMKaymeen',
        GF: 19,
        GA: 20,
        wins: 3,
        draws: 1,
        losses: 4,
        KOGF : 2 ,
        KOGA : 6
    }
    ,
    {
        teamName: 'Saudi arabia',
        teamId: 'Yahya05',
        GF: 24,
        GA: 3,
        wins: 8,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Inter',
        teamId: 'TheLegend',
        GF: 2,
        GA: 20,
        wins: 0,
        draws: 1,
        losses: 7,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Wydad Ac',
        teamId: 'GhdaGhda',
        GF: 13,
        GA: 13,
        wins: 3,
        draws: 2,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: '5yearsjail',
        teamId: 'S.C',
        GF: 14,
        GA: 13,
        wins: 5,
        draws: 0,
        losses: 3,
        KOGF : 3 ,
        KOGA : 7
    },
    {
        teamName: 'Zizozazi',
        teamId: 'Zizo',
        GF: 9,
        GA: 15,
        wins: 1,
        draws: 3,
        losses: 4,
        KOGF : 3 ,
        KOGA : 4
    },
    {
        teamName: 'Kolchitach',
        teamId: 'Kolchitach',
        GF: 8,
        GA: 25,
        wins: 1,
        draws: 1,
        losses: 6,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Japan',
        teamId: 'BYAKUYA_BY',
        GF: 25,
        GA: 8,
        wins: 6,
        draws: 1,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
];

export default teams;