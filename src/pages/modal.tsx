import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

const ModalImpl = ({ visible, setIsVisible }) => {
	if (!visible) {
		return null;
	}

	const handleOutsideClick = (e) => {
		// when this is called in onclick of "modal-container"
		// then call e.stopPropagation() in modalBody
		if(e.target === e.currentTarget) {
			setIsVisible(false);
		}
	}

	return createPortal(
		<div id="modal-container" style={{ ...styles.modalContainer }} onClick={() => setIsVisible(false)}>
			<div style={{ ...styles.modalBody }} onClick={e => e.stopPropagation()}>
				<h2>Modal Header</h2>
				<button onClick={() => setIsVisible(false) }>Close</button>	
			</div>
		</div>
		,
		document.getElementById('root') || document.body
	)
}

export default function Modal() {
	const [visible, setIsVisible] = useState(false)
	return (
		<div style={{ ...styles.container }}>
			<h1>Modal</h1>
			<button onClick={() => setIsVisible(true)}>Open Modal</button>
			<ModalImpl
				visible={visible}
				setIsVisible={setIsVisible}
			/>
		</div>
	)
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '20px',
  },
	modalContainer: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		top: 0,
		left: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundFilter: 'blur(100px)',
		animation: 'fadeIn 0.5s ease',
	},
  modalBody: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
		backgroundColor: '#ccc',
		width: '500px',
		animation: 'scaleIn 0.5s ease',
  },
} as const