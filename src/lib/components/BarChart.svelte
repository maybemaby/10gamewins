<script lang="ts">
	import * as Plot from '@observablehq/plot';
	import type { Data } from '@observablehq/plot';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		data,
		x,
		y,
		title,
		width = 800,
		height = 400,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		data: Data;
		x: string;
		y: string;
		title?: string;
		width?: number;
		height?: number;
	} = $props();

	let el: HTMLDivElement;

	$effect(() => {
		el.firstChild?.remove();

		el.append(
			Plot.plot({
				x: {
					axis: 'top',
					grid: true,
					label: 'Duration (minutes)'
				},
				y: {
					label: ''
				},
				marginLeft: 130,
				marginTop: 40,

				marks: [
					Plot.ruleX([0]),
					Plot.barX(data, { x, y, sort: { y: 'x', reverse: true }, tip: true })
				]
			})
		);
	});
</script>

<div {...rest}>
	{#if title}
		<p>{title}</p>
	{/if}
	<div class="barchart" bind:this={el}></div>
</div>

<style scoped>
	:global(.barchart svg) {
		font-size: 0.8rem;
	}
</style>
