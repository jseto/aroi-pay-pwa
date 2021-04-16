import '@testing-library/jest-dom/extend-expect'

import * as preact from 'preact';

declare global {
	var h: typeof preact.h;
}

global[ 'h' ] = preact.h;
