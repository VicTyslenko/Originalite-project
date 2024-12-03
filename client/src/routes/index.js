import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NoMatch from './NoMatch';

const Main = React.lazy(() => import('../@main/app'));
const Profile = React.lazy(() => import('../@profile/app'));
const Editor = React.lazy(() => import('../@editor/app'));

function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/*"
				element={
					<React.Suspense fallback={'...Loading'}>
						<Main />
					</React.Suspense>
				}
			/>
			<Route
				path="/account/*"
				element={
					<React.Suspense fallback="...Loading">
						<Profile />
					</React.Suspense>
				}
			/>
			<Route
				path="/editor/*"
				element={
					<React.Suspense fallback="...Loading">
						<Editor />
					</React.Suspense>
				}
			/>
			<Route path="*" element={<NoMatch />} />
		</Routes>
	);
}

export default AppRoutes;
