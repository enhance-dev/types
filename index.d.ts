export type EnhanceApiRequest = {
	body: Record<string, any> | string;
	headers: Record<string, string>;
	params: Record<string, string>;
	query: Record<string, string>;
	session: Record<string, any>;
	method: string;
	path: string;
};

export type EnhanceApiResponse = {
	json?: Record<string, any>;
	headers?: Record<string, string>;
	session?: Record<string, any>;
	location?: string;
	statusCode?: number;
	cacheControl?: string;
};

export type EnhanceElementResult = string; // ez

export type EnhanceHtmlFunction = (
	// "Why not TemplateStringsArray?"
	// see https://github.com/microsoft/TypeScript/issues/33304
	strings: ReadonlyArray<string>,
	...values: [...string[]]
) => EnhanceElementResult;

export type EnhanceElementArgs = {
	html: EnhanceHtmlFunction;
	state: {
		attrs: Record<string, string>;
		store: Record<any, any>;
	};
};

export type EnhanceHeadFunction = (
	request: EnhanceApiRequest,
) => EnhanceElementResult;

export type EnhanceApiFunction = (
	request: EnhanceApiRequest,
) => Promise<EnhanceApiResponse>;

export type EnhanceElementFunction = (
	args: EnhanceElementArgs,
) => EnhanceElementResult;
