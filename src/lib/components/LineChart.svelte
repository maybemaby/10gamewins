<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Plot from '@observablehq/plot';

	let {
		data,
		lineY,
		title,
		class: classname,
		height = 400,
		width = 800,
		...rest
	}: {
		data: Plot.Data;
		lineY?: boolean;
		title?: string;
		height?: number;
		width?: number;
	} & HTMLAttributes<HTMLDivElement> = $props();

	let el: HTMLDivElement;

	$effect(() => {
		el.firstChild?.remove();

		if (lineY) {
			el.append(
				Plot.lineY(data).plot({
					grid: true,
					width,
					height,
					y: {
						ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
					}
				})
			);
		}
	});
</script>

<div class={classname} {...rest}>
	{#if title}
		<p>{title}</p>
	{/if}

	<div bind:this={el}></div>
</div>
