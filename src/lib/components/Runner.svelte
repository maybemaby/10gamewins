<script lang="ts">
	let { initMax, run }: { initMax: number; run: number } = $props();

	let max = $state(initMax);

	let width = $derived((run / max) * 100);

	$effect(() => {
		if (run >= max) {
			max += initMax;
		}
	});
</script>

<div class="flex w-[400px] items-center gap-2 rounded-lg bg-black p-3 text-primary-foreground">
	<p>Runs:</p>
	<div class="relative h-2 w-full">
		<div class="absolute inset-0 bg-gray-700"></div>
		<div
			class="absolute bottom-0 top-0 bg-white transition-all ease-out"
			style="width: {width}%;"
		></div>
	</div>
	<p class="min-w-[4em]">
		{run}
	</p>
</div>
