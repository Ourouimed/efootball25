const teams = [
    {
        teamName: 'FC BARCELONA',
        teamId: 'RAPHAA',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Aquile06',
        teamId: 'Aquile06',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Raja atheltic club',
        teamId: 'Lamtiri',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Ross country FC',
        teamId: 'Hicham jerando',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'F PES ANA SULTAN',
        teamId: 'KAIDO_MORRI',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'المدمر 33',
        teamId: 'NO9TA',
        GF: 12,
        GA: 3,
        wins: 2,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Mamsalich',
        teamId: 'Mamsalich',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Ac milan',
        teamId: '3mek_d',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Ro3b🫣',
        teamId: 'To9os ifri9ya',
        GF: 2,
        GA: 1,
        wins: 1,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'العذاب اخويا العذاب',
        teamId: 'Mehdi-rhou',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Itihad zaghalghal',
        teamId: 'Aymen oudich',
        GF: 2,
        GA: 5,
        wins: 0,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'L9irch',
        teamId: '_monceff__',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'zlala',
        teamId: 'Tammar',
        GF: 11,
        GA: 8,
        wins: 2,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Maroc',
        teamId: 'Hamza El almi',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'LOS REYES1!',
        teamId: 'Wassiim_the_reaaal',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    } ,
    {
        teamName: 'L3zawa',
        teamId: 'pop',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'T9aba',
        teamId: 'Fost3er',
        GF: 7,
        GA: 0,
        wins: 1,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Bayern Munich',
        teamId: 'SVG AS FUCK',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Stutman',
        teamId: 'Reda',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'River Plate',
        teamId: 'Ostora9',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: '7O7O',
        teamId: 'Imad',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Arsenal',
        teamId: 'ernesto_III',
        GF: 1,
        GA: 10,
        wins: 0,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'habiboff',
        teamId: 'habiboff',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Adamlb',
        teamId: 'Adamlb',
        GF: 3,
        GA: 3,
        wins: 0,
        draws: 1,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Hatiem',
        teamId: 'Cactushtiem',
        GF: 0,
        GA: 7,
        wins: 0,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'FAR',
        teamId: 'Tareeq_uar',
        GF: 5,
        GA: 5,
        wins: 1,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Marseille',
        teamId: 'M.B',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: `Lbeldi`,
        teamId: 'M_rwn_',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'RTLGK',
        teamId: 'Mskrtah',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Manchester United',
        teamId: 'n4diiir',
        GF: 1,
        GA: 3,
        wins: 0,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'CR flamengo',
        teamId: 'M_47',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Real Madrid',
        teamId: 'Adam',
        GF: 3,
        GA: 1,
        wins: 1,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'PSG',
        teamId: 'R_A_Y_A-NE',
        GF: 3,
        GA: 2,
        wins: 1,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Pala',
        teamId: 'PMKaymeen',
        GF: 3,
        GA: 8,
        wins: 0,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Saudi arabia',
        teamId: 'Yahya05',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'Inter',
        teamId: 'TheLegend',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Wydad Ac',
        teamId: 'GhdaGhda',
        GF: 5,
        GA: 2,
        wins: 1,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
    ,
    {
        teamName: 'kolchi dyal Allah',
        teamId: 'saadNotnice',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    } , 
    {
        teamName: '5yearsjail',
        teamId: 'S.C',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Zizozazi',
        teamId: 'Zizo',
        GF: 3,
        GA: 3,
        wins: 0,
        draws: 1,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Kolchitach',
        teamId: 'Kolchitach',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'JAPAN',
        teamId: 'BYAKUYA_BY',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    }
];

export default teams;