<script lang="ts">
	import DurationPicker from './DurationPicker.svelte';
	import Slider from './ui/slider/slider.svelte';

	let {
		name = $bindable(),
		order,
		durationMinutes = $bindable(),
		onDurationChange,
		onRateChange
	}: {
		name: string;
		order: number;
		onRateChange: (rate: number[]) => void;
		durationMinutes: number;
		onDurationChange: (duration: number) => void;
	} = $props();

	let winRate = $state([50]);
</script>

<div
	class="flex w-11/12 min-w-[300px] max-w-[1000px] flex-col gap-x-6 gap-y-4 rounded-md border-[1px] px-4 py-3 sm:w-3/4 md:flex-row md:items-center md:justify-between xl:w-full"
>
	<span>
		{order}.
		<input
			type="text"
			class="rounded-sm border-none px-1 py-2 outline-none focus-within:bg-gray-50 hover:bg-gray-50"
			bind:value={name}
		/>
	</span>
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
	<div class="flex flex-col gap-2">
		<p>Time Taken</p>
		<DurationPicker {durationMinutes} {onDurationChange} />
	</div>
</div>
