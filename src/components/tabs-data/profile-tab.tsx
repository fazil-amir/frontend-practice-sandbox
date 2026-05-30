import type { TabDataType } from '../../pages/tab-data';

interface ProfileTabProps {
	data: TabDataType;
	setData: (data: TabDataType) => void;
}

export default function ProfileTab({ data, setData }: ProfileTabProps) {
	
	const handleOnChange = (field: keyof TabDataType) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [field]: e.target.value });
	};

	return (
		<div>
			<h2>Profile</h2>
			<div className="input-group">
				<label>Name:</label>
				<input
					type="text"
					placeholder="Enter your name"
					value={data.name}
					onChange={handleOnChange('name')} 
				/>
			</div>
			<div className="input-group">
				<label>Age:</label>
				<input
					type="number"
					placeholder="Enter your age"
					value={data.age}
					onChange={handleOnChange('age')} 
				/>
			</div>
			<div className="input-group">
				<label>Email:</label>
				<input
					type="email"
					placeholder="Enter your email"
					value={data.email}
					onChange={handleOnChange('email')} 
				/>
			</div>
		</div>
	);
}