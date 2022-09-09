export type EnhanceApiReq = {
	body: Record<string, any> | string;
	headers: Record<string, string>;
	params: Record<string, string>;
	query: Record<string, string>;
	session: Record<string, any>;
	method: string;
	path: string;
};

export type EnhanceApiRes = {
	json?: Record<string, any>;
	headers?: Record<string, string>;
	session?: Record<string, any>;
	location?: string;
	statusCode?: number;
	cacheControl?: string;
};

export type EnhanceElemResult = string; // ez

export type EnhanceHtmlFn = (
	// "Why not TemplateStringsArray?"
	// see https://github.com/microsoft/TypeScript/issues/33304
	strings: ReadonlyArray<string>,
	...values: [...string[]]
) => EnhanceElemResult;

export type EnhanceElemArgs = {
	html: EnhanceHtmlFn;
	state: {
		attrs: Record<string, string>;
		store: Record<any, any>;
	};
};

export type EnhanceApiFn = (request: EnhanceApiReq) => Promise<EnhanceApiRes>;

export type EnhanceHeadFn = (request: EnhanceApiReq) => EnhanceElemResult;

export type EnhanceElemFn = (args: EnhanceElemArgs) => EnhanceElemResult;
