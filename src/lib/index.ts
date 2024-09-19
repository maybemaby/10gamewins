export interface Game {
	name: string;
	winRate: number;
	durationMinutes: number;
}

export function win(winRate: number): boolean {
	return Math.random() < winRate / 100;
}
