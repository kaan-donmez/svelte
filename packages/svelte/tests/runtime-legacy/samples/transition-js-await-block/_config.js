import { test } from '../../test';

/** @type {(value: any) => void} */
let fulfil;

/** @type {Promise<any>} */
let promise;

export default test({
	get props() {
		promise = new Promise((f) => {
			fulfil = f;
		});
		return { promise };
	},

	intro: true,

	async test({ assert, target, raf }) {
		await Promise.resolve();
		const p = /** @type {HTMLParagraphElement & { foo: number }} */ (target.querySelector('p'));

		raf.tick(0);

		assert.equal(p.className, 'pending');
		assert.equal(p.foo, 0);

		raf.tick(50);
		assert.equal(p.foo, 0.5);

		fulfil(42);

		return promise.then(() => {
			raf.tick(80);
			const ps = /** @type {NodeListOf<HTMLParagraphElement & { foo: number }>} */ (
				target.querySelectorAll('p')
			);
			assert.equal(ps[0].className, 'pending');
			assert.equal(ps[1].className, 'then');
			assert.equal(ps[0].foo, 0.2);
			assert.equal(ps[1].foo, 0.3);
			raf.tick(100);
		});
	}
});
