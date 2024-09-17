<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Plot from '@observablehq/plot';

	let {
		data,
		title,
		width = 800,
		height = 300,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		data: Plot.Data;
		title?: string;
		width?: number;
		height?: number;
	} = $props();

	let el: HTMLDivElement;

	$effect(() => {
		el.firstChild?.remove();

		el.append(
			Plot.rectY(data, {
				...Plot.binX({ y: 'count' }, { domain: [0, 10], interval: 1 }),
				tip: true
			}).plot({
				y: { grid: true },
				width,
				height
			})
		);
	});
</script>

<div {...rest}>
	{#if title}
		<p>{title}</p>
	{/if}

	<div bind:this={el}></div>
</div>
