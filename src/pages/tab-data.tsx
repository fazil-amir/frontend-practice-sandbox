import { useState } from 'react'
import ProfileTab from '../components/tabs-data/profile-tab';
import InterestsTab from '../components/tabs-data/interests-tab';

const profileValidation = (data: TabDataType) => {
	if (!data.name) {
		return 'Name is required';
	}
	if (!data.age) {
		return 'Age is required';
	}
	if (!data.email) {
		return 'Email is required';
	}
	return null;
}

const TABS = [
	{
		id: 'profile',
		label: 'Profile',
		component: ProfileTab,
		validate: (d: TabDataType) => profileValidation(d)
	},
	{ id: 'interests', label: 'Interests', component: InterestsTab },
];

export type TabDataType = {
	name: string;
	age: number;
	email: string;
	interests: string[];
}

export default function TabData() {
	const [data, setData] = useState<TabDataType>({
		name: 'Fazil Amir',
		age: 32,
		email: 'fazil.amir@example.com',
		interests: ['Coding', 'Traveling', 'Cooking'],
	});
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const ActiveTabComponent = TABS[activeTabIndex].component;

	const handleTabChange = (index: number) => {
		const validate = TABS[activeTabIndex].validate;
		if (validate) {
			const error = validate(data);
			if (error) {
				alert(error);
				return;
			}
		}
		setActiveTabIndex(index);
	}


	return (
		<div style={{ ...styles.container as React.CSSProperties }}>
			<h1>Tab Data</h1>
			<div style={{ ...styles.tabTriggerContainer }}>
				{
					TABS.map((tab, index) => (
						<button
							key={tab.id}
							onClick={() => handleTabChange(index)}
							style={{
								...styles.tabTrigger,
								borderBottom: activeTabIndex === index ? '5px solid black' : '5px solid transparent',
							}}
						>
							{tab.label}
						</button>
					))
				}
			</div>

			<div style={{ ...styles.tabContentContainer }}>
				<ActiveTabComponent data={data} setData={setData} />
			</div>

			<div style={{ ...styles.navButtonContainer }}>
				{
					activeTabIndex > 0 && (
						<button
							style={{ ...styles.navButton }}
							onClick={() => handleTabChange(activeTabIndex - 1)}
						>
							Previous
						</button>
					)
				}
				{
					activeTabIndex < TABS.length - 1 && (
						<button style={{ ...styles.navButton }}
							onClick={() => handleTabChange(activeTabIndex + 1)}
						>
							Next
						</button>
					)
				}
				{
					activeTabIndex === TABS.length - 1 && (
						<button
							style={{ ...styles.navButton, backgroundColor: 'var(--accent-bg)' }}
							onClick={() => console.log(data)}
						>
							Submit
						</button>
					)
				}
			</div>
		</div>
	);
}

const styles = {
	container: {
		maxWidth: '1024px',
		width: '100%',
		margin: '0 auto',
		boxSizing: 'border-box',
		padding: '20px',
	},
	tabTriggerContainer: {
	},
	tabContentContainer: {
		border: '1px solid var(--border)',
		padding: '16px',
		marginTop: '8px',
	},
	tabTrigger: {
		padding: '15px',
		border: 'none',
		width: '150px',
		borderBottom: '5px solid transparent',

		cursor: 'pointer',
		fontSize: '14px',
		marginRight: '8px',
	},
	navButtonContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flex: 1,
		marginTop: '16px',
	},
	navButton: {
		padding: '10px 20px',
		border: 'none',
		cursor: 'pointer',
		marginRight: '8px',
	}
}