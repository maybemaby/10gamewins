<script>
	import GameInput from '$lib/components/GameInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let games = $state([
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
</script>

<h1 class="text-2xl font-semibold">10gamewins</h1>
<p class="prose my-3 text-lg">Simulate 10 game wins in a row.</p>

<section id="games" class="my-10 flex w-full flex-col items-center gap-3">
	{#each games as game, idx (idx)}
		<GameInput bind:name={game.name} onRateChange={(r) => (game.winRate = r[0])} />
	{/each}
</section>

<Button class="px-6 text-lg">Start</Button>

<!-- {JSON.stringify(games)} -->
