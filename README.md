> ⚠️  This library has not been published yet!

# `@enhance/types`

Type definitions for [Enhance](https://enhance.dev)

Required reading: [Enhance with TypeScript](https://enhance.dev)

## Installation

```sh
npm i -D @enhance/types
```

## JS/TS Examples

> 💁  The TypeScript examples are intentionally "over-typed" to demonstrate different uses. No need to declare a function's type and its call signature + return type.

### API Handler

Read more about [Enhance API Routes](https://enhance.dev/docs/learn/concepts/api-routes), their `request` object, and the expected `response` to understand each interface's properties.


#### With JSDoc comments in `.mjs`

The simplest way to type an API middleware function is to use JSDoc's `@type` and import "@enhance/types". Typically, the API handler functions should be marked `aasync`.

You can also import the arugment (`EnhanceApiReq`) and response (`EnhanceApiRes`) types.


```js
/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function get(request) {
  console.log(`Handling ${request.path}...`);

  const todos = [
    { title: "todo 1", completed: false },
    { title: "todo 2", completed: true },
    { title: "todo 3" },
  ];

  const response = {
    json: { todos },
  };

  return response;
}
```


#### With `.ts`

Enhance API middlewares for named `get` and `post` functions are passed an `EnhanceApiReq` object and expected to return a `Promise` that resolves with an `EnhanceApiRes` payload.

These types can be used independenty, or by simply typing each handler with `EnhanceApiFn`.


```ts
import type {
  EnhanceApiFn,
  EnhanceApiReq,
  EnhanceApiRes,
} from "@enhance/types";

type Todo = {
  title: string;
  completed?: boolean;
};

export const get: EnhanceApiFn = async function (
  request: EnhanceApiReq,
): Promise<EnhanceApiRes> {
  console.log(`Handling ${request.path}...`);

  const todos: Todo[] = [
    { title: "todo 1", completed: false },
    { title: "todo 2", completed: true },
    { title: "todo 3" },
  ];

  const response: EnhanceApiRes = {
    json: { todos },
  };

  return response;
};
```


#### Custom Element

[Single file components](https://enhance.dev/docs/learn/concepts/single-file-components) are the core of the Enhance developer experience.


#### With JSDoc comments in `.mjs`

Server rendered custom element functions receive `EnhanceElemArgs` with 2 keys:
1. `html: EnhanceHtmlFn` to render HTML strings
2. `state: {attrs: object, store: object}` a record of the state used by Enhance


```js
/**
 * @type {import('@enhance/types').EnhanceElemFn}
 */
export default function TodoItem({
  html,
  state: { attrs }
}) {
  const todoId = attrs["todo-id"];
  const completed = typeof attrs.completed === "string";

  return html`
    <div class="flex gap-2 mb-1">
      <input
        type="checkbox"
        name="completed"
        ${completed ? "checked" : ""}
      />
      <slot></slot>
    </div>
  `;
}
```


#### With `.ts`

Several type definitions are available for SSR custom elements. The simplest is to type your default export function as `EnhanceElemFn`.

You probably shouldn't make a copy of `html()` -- but its type, `EnhanceHtmlFn`, is available if needed.


```ts
import type {
  EnhanceElemArgs,
  EnhanceElemFn,
  EnhanceHtmlFn,
  EnhanceElemResult,
} from "@enhance/types";

const TodoItem: EnhanceElemFn = function ({
  html,
  state: { attrs },
}: EnhanceElemArgs): EnhanceElemResult {
  const todoId = attrs["todo-id"];
  const completed = typeof attrs.completed === "string";
  const myHtml: EnhanceHtmlFn = html;

  return html`
    <div class="flex gap-2 mb-1">
      <input
        type="checkbox"
        name="completed"
        ${completed ? "checked" : ""}
      />
      <slot></slot>
    </div>
  `;
};

export default TodoItem;
```


#### Head Function

Customize your Enhance app by providing [a Head function](https://enhance.dev/docs/learn/starter-project/head).


#### With JSDoc comments in `.mjs`

Utilize the `EnhanceHeadFn` type to annotate your app/head.mjs file.

The function takes a `EnhanceApiReq` object for access to things like the request `path` and `session`.

Return a standard `EnhanceElemResult` (aka a `string` of HTML).


```js
/**
 * @type {import('@enhance/types').EnhanceHeadFn}
 */
export default function Head(request) {
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
}

```


#### With `.ts`

The `EnhanceHeadFn` is similar to an API handler but returns a string of HTML as `EnhanceElemResult`.


```ts
import type {
  EnhanceApiReq,
  EnhanceElemResult,
  EnhanceHeadFn,
} from "@enhance/types";

const Head: EnhanceHeadFn = function (
  request: EnhanceApiReq,
): EnhanceElemResult {
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

export default Head;
```
