Array.prototype.myMap = function (callback) {
	const results = [];
	const arr = this;

	for (let i = 0; i < arr.length; i++) {
		results.push(callback(arr[i], i, arr));
	}

	console.log(results);

	return results;
};

export default function Javascript() {
	const runMyMap = () => {
		[1, 2, 3, 4].myMap((v, i) => {});
	};

	const runMethod = () => {
		runMyMap();
	};

	return (
		<div>
			<h1>Javascript Practice</h1>
			<button onClick={runMethod}>Click Me</button>
		</div>
	);
}
