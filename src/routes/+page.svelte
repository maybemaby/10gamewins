<script lang="ts">
	import GameInput from '$lib/components/GameInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Game } from '$lib';
	import { createSimState } from '$lib/sim.svelte';
	import LucidePlay from '~icons/lucide/play';
	import LucidePause from '~icons/lucide/pause';
	import LucideRefreshCcw from '~icons/lucide/refresh-ccw';
	import { cn } from '$lib/utils';
	import Runner from '$lib/components/Runner.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import Histogram from '$lib/components/Histogram.svelte';
	import BarChart from '$lib/components/BarChart.svelte';

	let games: Game[] = $state([
		{
			name: 'Game 1',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 2',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 3',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 4',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 5',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 6',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 7',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 8',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 9',
			winRate: 50,
			durationMinutes: 5
		},
		{
			name: 'Game 10',
			winRate: 50,
			durationMinutes: 5
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

	let flattenedDurationPerGame = $derived.by(() => {
		return Object.entries(sim.durationPerGame).map(([game, duration]) => ({ game, duration }));
	});
</script>

<h1 class="text-2xl font-semibold">10gamewins</h1>
<p class="prose my-3 text-center text-lg">
	Simulate 10 game wins in a row. Inspired by <a
		class="text-blue-500"
		href="https://www.youtube.com/@ludwig"
		target="_blank">Ludwig's</a
	> God Gamer Challenge.
</p>

<section
	id="games"
	class="my-10 flex w-full grid-cols-2 flex-col items-center gap-3 xl:grid xl:max-w-screen-xl xl:justify-items-center"
>
	{#each games as game, idx (idx)}
		<GameInput
			order={idx + 1}
			bind:name={game.name}
			onRateChange={(r) => (game.winRate = r[0])}
			durationMinutes={game.durationMinutes}
			onDurationChange={(d) => (game.durationMinutes = d)}
		/>
	{/each}
</section>

<div class="mb-5 flex flex-wrap items-center justify-center gap-3">
	<Button
		class={cn(
			'w-[150px] gap-2 px-6 text-lg hover:bg-green-600',
			// sim.isRunning && 'bg-green-600',
			sim.isRunning && 'hover:bg-red-600'
		)}
		onclick={toggleSim}
	>
		{#if sim.isRunning}
			<LucidePause /> Pause
		{:else}
			<LucidePlay /> Start
		{/if}
	</Button>
	<Button class="gap-2" variant="ghost" onclick={sim.reset}>
		<LucideRefreshCcw /> Reset
	</Button>

	<span class="flex items-center gap-2 sm:ml-4">
		<p>Speed:</p>
		<Button onclick={() => sim.setSpeed(1)} variant="outline">1x</Button>
		<Button onclick={() => sim.setSpeed(2)} variant="outline">2x</Button>
		<Button onclick={() => sim.setSpeed(5)} variant="outline">5x</Button>
		<Button onclick={() => sim.setSpeed(10)} variant="outline">10x</Button>
	</span>
</div>

<Runner initMax={100} run={sim.runNumber} />
<p>Longest Streak: {sim.maxWins}</p>
<p>
	Total Duration: {`${sim.totalDuration.hours}h:${sim.totalDuration.minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}m`}
</p>
<div class="my-5 flex grid-cols-2 flex-col gap-2 xl:grid">
	<LineChart data={sim.streakHistory} lineY title="Run History" />
	<Histogram title="Streak Distribution" data={sim.streakHistory} />
	<BarChart title={'Duration Per Game'} data={flattenedDurationPerGame} x="duration" y="game" />
</div>
