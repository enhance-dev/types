import { expectError, expectNever, expectType } from "tsd";
import type {
	EnhanceApiFn,
	EnhanceApiRes,
	EnhanceElemFn,
	EnhanceHeadFn,
	EnhanceHtmlFn,
} from ".";

type Todo = {
	title: string;
	completed?: boolean;
};

// API Handler
// sync
export const get: EnhanceApiFn = function (request) {
	console.log(`Handling ${request.path}...`);

	const filter: string = request.body.filter;

	const todos: Todo[] = [
		{ title: "todo 1", completed: false },
		{ title: "todo 2", completed: true },
		{ title: "todo 3" },
	];

	let invalidResponse: EnhanceApiRes = { json: { todos } };
	expectError(
		(invalidResponse = {
			json: {},
			body: "",
		}),
	);

	return {
		session: {},
		statusCode: 200,
		json: { filter, todos },
	};
};
// async
export const post: EnhanceApiFn = async function (req) {
	return {
		json: { req },
	};
};

// Custom Element
export const TodoItem: EnhanceElemFn = function ({ html, state: { attrs } }) {
	const todoId = attrs["todo-id"];
	const completed = typeof attrs.completed === "string";
	const _myHtml: EnhanceHtmlFn = html;

	return html`
    <div class="flex gap-2 mb-1">
      <input
        todo-id="${todoId}"
        type="checkbox"
        name="completed"
        ${completed ? "checked" : ""}
      />
      <slot></slot>
    </div>
  `;
};

// Head Function
export const Head: EnhanceHeadFn = function (request, status, error) {
	if (status > 399) {
		return "Uhoh";
	}

	if (error) {
		return error.message;
	}

	const { path } = request;
	const title = `Todos — ${path}`;

	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="stylesheet" href="/_static/styles.css">
</head>
  `;
};
