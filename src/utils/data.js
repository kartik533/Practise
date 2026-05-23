export const barchart = [
    {
        count: 10,
        color: 'red',
        id: 1,
    },
    {
        count: 20,
        color: 'blue',
        id: 2,
    },
    {
        count: 30,
        color: 'yellow',
        id: 3,
    },
    {
        count: 40,
        color: 'green',
        id: 4,
    },
]

export const nestedList = [
    {
        id: 1,
        name: "Digital Assets",
        items: [
            {
                id: 2,
                name: "Cryptocurrencies",
                items: [
                    {
                        id: 3,
                        name: "Bitcoin",
                        items: [
                            {
                                id: 4,
                                name: "BTC Storage",
                                items: [
                                    {
                                        id: 5,
                                        name: "Secure Wallets",
                                    },
                                    {
                                        id: 6,
                                        name: "Mobile Solutions",
                                    },
                                    {
                                        id: 7,
                                        name: "Desktop Applications",
                                    },
                                ],
                            },
                            {
                                id: 8,
                                name: "BTC Exchanges",
                            },
                            {
                                id: 9,
                                name: "BTC Mining",
                                items: [
                                    {
                                        id: 10,
                                        name: "Mining Hardware",
                                    },
                                    {
                                        id: 11,
                                        name: "Mining Pools",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 12,
                        name: "Ethereum",
                        items: [
                            {
                                id: 13,
                                name: "ETH Wallets",
                                items: [
                                    {
                                        id: 14,
                                        name: "Web Wallets",
                                    },
                                    {
                                        id: 15,
                                        name: "Desktop Wallets",
                                    },
                                    {
                                        id: 16,
                                        name: "Paper Wallets",
                                    },
                                ],
                            },
                            {
                                id: 17,
                                name: "ETH Exchanges",
                            },
                            {
                                id: 18,
                                name: "ETH Mining",
                                items: [
                                    {
                                        id: 19,
                                        name: "Mining Rewards",
                                    },
                                    {
                                        id: 20,
                                        name: "Cloud Mining",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 21,
                name: "Blockchain",
                items: [
                    {
                        id: 22,
                        name: "Decentralization",
                    },
                    {
                        id: 23,
                        name: "Smart Contracts",
                    },
                ],
            },
        ],
    },
    {
        id: 23,
        name: 'Staking',
        items: [
            {
                id: 24,
                name: 'Rewards'
            }
        ]
    }
];

export const folders  = [
    {
        id: 1,
        name: 'README.md',
    },
    {
        id: 2,
        name: 'Documents',
        children: [
            {
                id: 3,
                name: 'Word.doc',
            },
            {
                id: 4,
                name: 'Powerpoint.ppt',
            },
        ],
    },
    {
        id: 5,
        name: 'Downloads',
        children: [
            {
                id: 6,
                name: 'unnamed.txt',
            },
            {
                id: 7,
                name: 'Misc',
                children: [
                    {
                        id: 8,
                        name: 'foo.txt',
                    },
                    {
                        id: 9,
                        name: 'bar.txt',
                    },
                ],
            },
        ],
    },
];