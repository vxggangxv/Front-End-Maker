export const dateFormat = {
	methods: {
		getTodayType1() {
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			return `${year}.${month}.${day}`;
		},
	},
};
