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
			if (currentGameIdx >= games.length - 1) {
				pause();
			}

			let game = games[currentGameIdx];

			if (win(game.winRate)) {
				currentStreak++;
				maxWins = Math.max(maxWins, currentStreak);
				currentGameIdx++;
			} else {
				currentStreak = 0;
				currentGameIdx = 0;
				runNumber++;
			}
		}, 200 / speed);
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
		run,
		pause,
		setSpeed,
		reset
	};
}