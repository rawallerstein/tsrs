export function titleCase(str: string): string {
	const words = str.split(' ')
	const uppercased = words
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(' ')
	return uppercased
}
