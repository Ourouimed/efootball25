const teams = [
    {
        teamName: 'Med Fc',
        teamId: 'Medox24',
        GF: 11,
        GA: 15,
        wins: 0,
        draws: 2,
        losses: 5,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Pala',
        teamId: 'Ilyass',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Zooooooooooot',
        teamId: 'Pop',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Thorny Dragon',
        teamId: 'Adam',
        GF: 0,
        GA: 6,
        wins: 0,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'البوال',
        teamId: 'NO9TA',
        GF: 8,
        GA: 6,
        wins: 1,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'الخراي',
        teamId: 'Abdo tiger',
        GF: 13,
        GA: 11,
        wins: 2,
        draws: 1,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Zelala',
        teamId: 'Wassim the real',
        GF: 4,
        GA: 3,
        wins: 1,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Milan',
        teamId: 'Habiboff',
        GF: 6,
        GA: 6,
        wins: 1,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'ro3b☠️',
        teamId: 'to9os ifri9ya',
        GF: 1,
        GA: 4,
        wins: 0,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'صلي على محمد',
        teamId: 'سفيان',
        GF: 7,
        GA: 10,
        wins: 1,
        draws: 1,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'maroc',
        teamId: 'adriano',
        GF: 5,
        GA: 5,
        wins: 1,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Japane',
        teamId: 'ABDO',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'F PES ANA SULTAN',
        teamId: 'KAIDO_MORRI',
        GF: 10,
        GA: 4,
        wins: 3,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Thelegend',
        teamId: 'Thelegend',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'L9irch',
        teamId: 'Moncef',
        GF: 12,
        GA: 11,
        wins: 2,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: '5yearsjail',
        teamId: '5yearsjail',
        GF: 7,
        GA: 7,
        wins: 1,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'العذاب اخويا العذاب',
        teamId: 'Mehdi-rhou',
        GF: 16,
        GA: 6,
        wins: 5,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'FC BARCELONA',
        teamId: 'MESSSI',
        GF: 0,
        GA: 11,
        wins: 0,
        draws: 0,
        losses: 3,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Johny sins',
        teamId: 'Ast3ax',
        GF: 11,
        GA: 6,
        wins: 2,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Chill guy',
        teamId: 'Reda',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'FAR BEFORE ABC',
        teamId: 'Abdessamad',
        GF: 7,
        GA: 17,
        wins: 1,
        draws: 0,
        losses: 4,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Chrwit',
        teamId: 'Amine',
        GF: 8,
        GA: 1,
        wins: 3,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'نادي الجيش الملكي',
        teamId: 'Zakaria',
        GF: 5,
        GA: 6,
        wins: 1,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Saudi the second',
        teamId: 'Yahya05',
        GF: 2,
        GA: 8,
        wins: 0,
        draws: 0,
        losses: 2,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Kolchi_tach',
        teamId: 'MOHAMED',
        GF: 10,
        GA: 2,
        wins: 2,
        draws: 1,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },

    {
        teamName: 'Dos Kallas',
        teamId: 'Aymane',
        GF: 10,
        GA: 7,
        wins: 2,
        draws: 0,
        losses: 1,
        KOGF : 0 ,
        KOGA : 0
    },

    {
        teamName: 'Lmasoniya',
        teamId: 'AMINE',
        GF: 1,
        GA: 1,
        wins: 0,
        draws: 1,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'Olympique de Safi',
        teamId: 'Younes marouri',
        GF: 0,
        GA: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'FARI9 LMXRML',
        teamId: 'Hamada',
        GF: 7,
        GA: 3,
        wins: 2,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
    {
        teamName: 'CR Flamengo',
        teamId: 'M_4<',
        GF: 5,
        GA: 3,
        wins: 1,
        draws: 0,
        losses: 0,
        KOGF : 0 ,
        KOGA : 0
    },
];

export default teams;