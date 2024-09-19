/* eslint-disable prefer-const */

import { win, type Game } from '$lib';

export function createSimState(games: Game[]) {
	let speed = $state(1);
	let runNumber = $state(1);
	let maxWins = $state(0);
	let currentStreak = $state(0);
	let isRunning = $state(false);
	let currentGameIdx = $state(0);
	let interval = $state<number | null>(null);
	let streakHistory = $state<number[]>([0]);
	let won = $state(false);
	let totalDuration = $state<Record<string, number>>({});

	function setSpeed(newSpeed: number) {
		speed = newSpeed;

		if (isRunning) {
			pause();
			run();
		}
	}

	function run() {
		isRunning = true;
		interval = setInterval(() => {
			if (currentGameIdx == games.length) {
				pause();
				streakHistory.push(currentStreak);
				won = true;
				return;
			}

			let game = games[currentGameIdx];

			if (win(game.winRate)) {
				currentStreak++;
				maxWins = Math.max(maxWins, currentStreak);
				currentGameIdx++;
			} else {
				streakHistory.push(currentStreak);
				currentStreak = 0;
				currentGameIdx = 0;
				runNumber++;
			}

			totalDuration[game.name] = (totalDuration[game.name] || 0) + game.durationMinutes;
		}, 180 / speed);
	}

	function pause() {
		if (interval) clearInterval(interval);
		interval = null;
		isRunning = false;
	}

	function reset() {
		pause();
		runNumber = 1;
		maxWins = 0;
		currentStreak = 0;
		currentGameIdx = 0;
		streakHistory = [0];
		won = false;
		totalDuration = {};
	}

	return {
		get runNumber() {
			return runNumber;
		},
		get maxWins() {
			return maxWins;
		},
		get isRunning() {
			return isRunning;
		},
		get currentStreak() {
			return currentStreak;
		},
		get streakHistory() {
			return streakHistory;
		},
		get won() {
			return won;
		},
		get totalDuration() {
			const total = Object.values(totalDuration).reduce((acc, val) => acc + val, 0);

			return {
				hours: Math.floor(total / 60),
				minutes: total % 60
			};
		},
		get durationPerGame() {
			return totalDuration;
		},
		run,
		pause,
		setSpeed,
		reset
	};
}
