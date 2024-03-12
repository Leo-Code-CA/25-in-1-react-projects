export const menus = [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Discover',
		to: '/discover',
		children: [
			{
				label: 'GitHub Profile',
				to: '/discover#githubprofile',
			},
			{
				label: 'Color Generator',
				to: '/discover#colorgenerator',
			},
			{
				label: 'Did you know?',
				to: '/discover#accordion',
			},
			{
				label: 'QR Code',
				to: '/discover#qrcode',
			},
		],
	},
	{
		label: 'Unwind',
		to: '/unwind',
		children: [
			{
				label: 'Image Slider',
				to: '#imageslider',
			},
			{
				label: 'Tic Tac Toe',
				to: '#tictactoe',
			},
			{
				label: 'Tabs',
				to: '#tabs',
			},
			{
				label: 'Load More',
				to: '#loadmore',
			},
		],
	},
	{
		label: 'Energize',
		to: '/energize',
	},
	{
		label: 'Create',
		to: '/create',
	},
	{
		label: 'Plan',
		to: '/plan',
		children: [
			{
				label: 'Tracker',
				to: '#tracker',
			},
			{
				label: 'Cart',
				to: '#cart',
			},
		],
	},
];

export default menus;
