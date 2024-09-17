<script lang="ts">
	import Slider from './ui/slider/slider.svelte';

	let {
		name = $bindable(),
		onRateChange
	}: { name: string; onRateChange: (rate: number[]) => void } = $props();

	let winRate = $state([50]);
</script>

<div
	class="flex w-1/2 min-w-[300px] max-w-[700px] flex-col items-center gap-6 rounded-md border-[1px] px-4 py-3 md:flex-row md:justify-between"
>
	<input
		type="text"
		class="rounded-sm border-none px-1 py-2 outline-none focus-within:bg-gray-50 hover:bg-gray-50"
		bind:value={name}
	/>
	<div class="flex w-[170px] flex-col gap-2">
		<label for="win-rate">Win Rate: {winRate}%</label>
		<Slider
			id="win-rate"
			max={100}
			min={0}
			step={0.5}
			bind:value={winRate}
			onValueChange={onRateChange}
		/>
	</div>
</div>
