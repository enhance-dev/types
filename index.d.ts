export type EnhanceApiReq = {
	body: Record<string, any>;
	headers: Record<string, string>;
	params: Record<string, string>;
	query: Record<string, string>;
	session: Record<string, any>;
	method: string;
	path: string;
};

type EnhanceApiResBase = {
	headers?: Record<string, string>;
	session?: Record<string, any>;
	location?: string;
	statusCode?: number;
	cacheControl?: string;
};

type EnhanceApiResJson = {
	json?: Record<string, any>;
	body?: never;
};

type EnhanceApiResBody = {
	body?: string;
	json?: never;
};

export type EnhanceApiRes =
	& EnhanceApiResBase
	& (EnhanceApiResJson | EnhanceApiResBody);

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

export type EnhanceApiFn = (
	request: EnhanceApiReq,
) => Promise<EnhanceApiRes> | EnhanceApiRes;

export type EnhanceApiFnChain = EnhanceApiFn[];

export type EnhanceHeadFn = (
	request: EnhanceApiReq,
	status: number,
	error?: Error,
) => EnhanceElemResult;

export type EnhanceElemFn = (args: EnhanceElemArgs) => EnhanceElemResult;
