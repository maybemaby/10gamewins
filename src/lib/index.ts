export interface Game {
	name: string;
	winRate: number;
}

export function win(winRate: number): boolean {
	return Math.random() < winRate / 100;
}
