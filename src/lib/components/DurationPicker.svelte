<script lang="ts">
	let {
		durationMinutes,
		onDurationChange
	}: { durationMinutes: number; onDurationChange: (duration: number) => void } = $props();

	let hours = $state(Math.floor(durationMinutes / 60));
	let displayMinutes = $state(durationMinutes % 60);

	let totalMinutes = $derived(hours * 60 + displayMinutes);

	$effect(() => {
		onDurationChange(totalMinutes);
	});
</script>

<div class="flex items-start gap-2">
	<div class="flex flex-col">
		<input
			type="number"
			class="w-16 rounded-md border-[1px] border-gray-300 px-2 py-1 text-center"
			bind:value={hours}
			min="0"
		/>
		<p>Hours</p>
	</div>
	<span>:</span>
	<div class="flex flex-col">
		<input
			type="number"
			class="w-16 rounded-md border-[1px] border-gray-300 px-2 py-1 text-center"
			bind:value={displayMinutes}
			min="0"
			max="59"
		/>
		<p>Minutes</p>
	</div>
</div>
