<script>
	let count = $state(0);

	let test = $derived.by(() => {
		if (count > 1) {
			throw new Error('test');
		}
	});
</script>

<svelte:boundary onerror={(e) => { throw(e) }}>
		<div>Count: {count}</div>
		<button onclick={() => count++}>Increment</button>
		{count} / {test}
</svelte:boundary>

