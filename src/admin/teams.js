const teams = [
    {
        teamName: 'FC BARCELONA',
        teamId: 'RAPHAA',
        GF: 7,
        GA: 21,
        wins: 1,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Raja atheltic club',
        teamId: 'Lamtiri',
        GF: 3,
        GA: 7,
        wins: 1,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'F PES ANA SULTAN',
        teamId: 'KAIDO_MORRI',
        GF: 26,
        GA: 10,
        wins: 4,
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
        GA: 6,
        wins: 0,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Ro3b🫣',
        teamId: 'To9os ifri9ya',
        GF: 23,
        GA: 13,
        wins: 6,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'العذاب اخويا العذاب',
        teamId: 'Mehdi-rhou',
        GF: 21,
        GA: 10,
        wins: 5,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Med Fc',
        teamId: 'Medox24',
        GF: 5,
        GA: 28,
        wins: 0,
        draws: 0,
        losses: 7,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'L9irch',
        teamId: '_monceff__',
        GF: 21,
        GA: 7,
        wins: 3,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
    ,{
        teamName: 'abdo tiger',
        teamId: 'Tammar',
        GF: 14,
        GA: 14,
        wins: 3,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Maroc',
        teamId: 'Hamza El almi',
        GF: 19,
        GA: 6,
        wins: 4,
        draws: 1,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'LOS REYES1!',
        teamId: 'Wassiim_the_reaaal',
        GF: 5,
        GA: 8,
        wins: 0,
        draws: 1,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    } ,
    {
        teamName: 'L3zwa',
        teamId: 'pop',
        GF: 21,
        GA: 15,
        wins: 5,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'T9aba',
        teamId: 'Fost3er',
        GF: 32,
        GA: 19,
        wins: 7,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Bayern Munich',
        teamId: 'SVG AS FUCK',
        GF: 11,
        GA: 8,
        wins: 2,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Stutman',
        teamId: 'Reda',
        GF: 6,
        GA: 9,
        wins: 1,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'River Plate',
        teamId: 'Ostora9',
        GF: 9,
        GA: 16,
        wins: 2,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: '7O7O',
        teamId: 'Imad',
        GF: 4,
        GA: 5,
        wins: 0,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Arsenal',
        teamId: 'ernesto_III',
        GF: 9,
        GA: 18,
        wins: 2,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'habiboff',
        teamId: 'habiboff',
        GF: 15,
        GA: 9,
        wins: 2,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Adamlb',
        teamId: 'Adamlb',
        GF: 11,
        GA: 8,
        wins: 1,
        draws: 1,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Hatiem',
        teamId: 'Cactushtiem',
        GF: 2,
        GA: 18,
        wins: 0,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'FAR',
        teamId: 'Tareeq_uar',
        GF: 12,
        GA: 8,
        wins: 2,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Marseille',
        teamId: 'M.B',
        GF: 5,
        GA: 5,
        wins: 1,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'CR flamengo',
        teamId: 'M_47',
        GF: 4,
        GA: 9,
        wins: 1,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Real Madrid',
        teamId: 'Adam',
        GF: 15,
        GA: 13,
        wins: 2,
        draws: 0,
        losses: 1,
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
        draws: 0,
        losses: 4,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Saudi arabia',
        teamId: 'Yahya05',
        GF: 4,
        GA: 1,
        wins: 2,
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
        GA: 5,
        wins: 0,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Wydad Ac',
        teamId: 'GhdaGhda',
        GF: 10,
        GA: 10,
        wins: 1,
        draws: 1,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: '5yearsjail',
        teamId: 'S.C',
        GF: 1,
        GA: 5,
        wins: 0,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Zizozazi',
        teamId: 'Zizo',
        GF: 6,
        GA: 6,
        wins: 1,
        draws: 1,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Kolchitach',
        teamId: 'Kolchitach',
        GF: 6,
        GA: 19,
        wins: 1,
        draws: 0,
        losses: 4,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Japan',
        teamId: 'BYAKUYA_BY',
        GF: 16,
        GA: 8,
        wins: 3,
        draws: 1,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
];

export default teams;