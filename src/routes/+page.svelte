<script lang="ts">
	import GameInput from '$lib/components/GameInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Game } from '$lib';
	import { createSimState } from '$lib/sim.svelte';
	import LucidePlay from '~icons/lucide/play';
	import LucidePause from '~icons/lucide/pause';
	import LucideRefreshCcw from '~icons/lucide/refresh-ccw';

	let games: Game[] = $state([
		{
			name: 'Game 1',
			winRate: 50
		},
		{
			name: 'Game 2',
			winRate: 50
		},
		{
			name: 'Game 3',
			winRate: 50
		},
		{
			name: 'Game 4',
			winRate: 50
		},
		{
			name: 'Game 5',
			winRate: 50
		},
		{
			name: 'Game 6',
			winRate: 50
		},
		{
			name: 'Game 7',
			winRate: 50
		},
		{
			name: 'Game 8',
			winRate: 50
		},
		{
			name: 'Game 9',
			winRate: 50
		},
		{
			name: 'Game 10',
			winRate: 50
		}
	]);

	let sim = createSimState(games);

	function toggleSim() {
		if (sim.isRunning) {
			sim.pause();
		} else {
			sim.run();
		}
	}
</script>

<h1 class="text-2xl font-semibold">10gamewins</h1>
<p class="prose my-3 text-lg">Simulate 10 game wins in a row.</p>

<section id="games" class="my-10 flex w-full flex-col items-center gap-3">
	{#each games as game, idx (idx)}
		<GameInput bind:name={game.name} onRateChange={(r) => (game.winRate = r[0])} />
	{/each}
</section>

<div class="flex items-center gap-3">
	<Button class="w-[150px] gap-2 px-6 text-lg" onclick={toggleSim}>
		{#if sim.isRunning}
			<LucidePause /> Pause
		{:else}
			<LucidePlay /> Start
		{/if}
	</Button>
	<Button class="gap-2" variant="ghost" onclick={sim.reset}>
		<LucideRefreshCcw /> Reset
	</Button>
</div>

<p>{sim.runNumber}</p>
<p>Streak: {sim.currentStreak}</p>
<p>Longest Streak: {sim.maxWins}</p>
