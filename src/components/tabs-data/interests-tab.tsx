import type { TabDataType } from '../../pages/tab-data';

interface InterestsTabProps {
	data: TabDataType;
	setData: (data: TabDataType) => void;
}

const INTERESTS = ['Coding', 'Traveling', 'Cooking', 'Sports', 'Music'];

export default function InterestsTab({ data, setData }: InterestsTabProps) {

	const handleOnChange =(e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		const value = e.target.value;

		if (checked) {
			setData({
				...data,
				interests:[
					...data.interests,
					e.target.value
				]
			})
		} else{
			setData({
				...data,
				interests: data.interests.filter(i => i !== value),
			})
			
		}
	}

	const isChecked = (interest: string) => {
		return data.interests.includes(interest);
	}

	return (
		<div>
			<h2>Interests</h2>
			{INTERESTS.map((interest, index) => (
				<div key={index}>
					<input type="checkbox" checked={isChecked(interest)} value={interest} onChange={handleOnChange} />
					{interest}
				</div>
			))}
		</div>
	);
}