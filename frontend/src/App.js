import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'

function App() {
	return (
		<div>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					success: {
						icon: '✔️'
					}
				}}
			/>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;