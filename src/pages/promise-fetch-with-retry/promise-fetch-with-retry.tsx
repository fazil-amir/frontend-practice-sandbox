import { lazy, Suspense, useState } from "react";
import "./promise-fetch-with-retry.css";

const CodeViewer = lazy(() => import("../../components/code-viewer/code-viewer"));

const status = [false, false, true];
let index = 0;

function myPromise() {
	return new Promise((resolve, reject) => {
		const flag = status[index];

		index = (index + 1) % status.length;

		setTimeout(() => {
			if (flag) {
				resolve("worked");
			} else {
				reject("failed");
			}
		}, 1000);
	});
}

async function handlePromiseWithReties(
	callback: () => Promise<unknown>,
	tries = 3,
) {
	try {
		return await callback();
	} catch (e) {
		if (tries > 0) {
			console.error(`Promised failed with error : ${e} hence retrying`);
			return await handlePromiseWithReties(callback, tries - 1);
		}
		throw e;
	}
}

type DemoId = "retry";

type Demo = {
	id: number;
	demoId: DemoId;
	title: string;
	description: string;
	buttonLabel: string;
	fn: Function;
	run: () => unknown;
};

const getCounter = (function () {
	let count = 1;
	return () => count++;
})();

const DEMOS: Demo[] = [
	{
		id: getCounter(),
		demoId: "retry",
		title: "Promise with retry",
		description:
			"Retries a promise factory up to 3 times. The mock promise fails twice, then succeeds — check the console for retry logs.",
		buttonLabel: "Run with retries",
		fn: handlePromiseWithReties,
		run: () => {
			handlePromiseWithReties(myPromise, 3)
				.then((data) => {
					console.log(data);
				})
				.catch((e) => {
					console.log(e);
				});
			return "Check console";
		},
	},
];

export default function PromiseFetchWithRetry() {
	const [outputs, setOutputs] = useState<Partial<Record<number, string>>>({});
	const [visibleCode, setVisibleCode] = useState<
		Partial<Record<number, boolean>>
	>({});

	const runDemo = (demo: Demo) => {
		const result = demo.run();
		setOutputs((prev) => ({
			...prev,
			[demo.id]: JSON.stringify(result, null, 2),
		}));
	};

	const toggleCode = (id: number) => {
		setVisibleCode((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	return (
		<>
			<h1>Promise Fetch With Retry</h1>
			<p>
				Run a flaky promise with automatic retries. Results log to the console
				— open DevTools to see each attempt.
			</p>

			<ul className="js-demo-list page-stack">
				{DEMOS.map((demo) => (
					<li key={demo.id} className="js-demo">
						<div className="js-demo__header">
							<h2>{demo.title}</h2>
							<button
								type="button"
								className="secondary-btn js-demo__code-toggle"
								onClick={() => toggleCode(demo.id)}
								aria-expanded={visibleCode[demo.id] ?? false}
							>
								{visibleCode[demo.id] ? "Hide code" : "Show code"}
							</button>
						</div>
						<p className="js-demo__desc">
							<code>{demo.description}</code>
						</p>
						{visibleCode[demo.id] && (
							<Suspense
								fallback={
									<pre className="code-output">
										<code>Loading…</code>
									</pre>
								}
							>
								<CodeViewer code={demo.fn.toString()} />
							</Suspense>
						)}
						<button
							type="button"
							className="primary-btn"
							onClick={() => runDemo(demo)}
						>
							{demo.buttonLabel}
						</button>
						<pre className="code-output" aria-live="polite">
							<code>
								{outputs[demo.id] ?? "// Click the button to see output"}
							</code>
						</pre>
					</li>
				))}
			</ul>
		</>
	);
}
