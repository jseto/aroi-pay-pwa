import '@testing-library/jest-dom/extend-expect'

import * as React from 'react';

declare global {
	var React: typeof React;
}

global[ 'React' ] = React;
