# `@enhance/types`

Type definitions for [Enhance](https://enhance.dev)

## JS and TS Usage Examples

> 💁  The TypeScript examples are intentionally "over-typed" to demonstrate different uses. No need to declare a function's type and its call signature + return type. Also, don't make a copy of `html()` -- but its type is available if needed.

### API Handler

<table>
<tr>
<td valign="top">

#### With JSDoc comments in `.mjs`

```js
/**
 * @type {import('@enhance/types').EnhanceApiFunction}
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

</td>
<td valign="top">

#### With `.ts`

```ts
import type {
  EnhanceApiFunction,
  EnhanceApiRequest,
  EnhanceApiResponse,
} from ".@enhance/types";

type Todo = {
  title: string;
  completed?: boolean;
};

export const get: EnhanceApiFunction = async function (
  request: EnhanceApiRequest,
): Promise<EnhanceApiResponse> {
  console.log(`Handling ${request.path}...`);

  const todos: Todo[] = [
    { title: "todo 1", completed: false },
    { title: "todo 2", completed: true },
    { title: "todo 3" },
  ];

  const response: EnhanceApiResponse = {
    json: { todos },
  };

  return response;
};
```

</td>
</tr>
</table>

### Custom Element

<table>
<tr>
<td valign="top">

#### With JSDoc comments in `.mjs`

```js
/**
 * @type {import('@enhance/types').EnhanceElementFunction}
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

</td>
<td valign="top">

#### With `.ts`

```ts
import type {
  EnhanceElementArgs,
  EnhanceElementFunction,
  EnhanceHtmlFunction,
  EnhanceElementResult,
} from "@enhance/types";

const TodoItem: EnhanceElementFunction = function ({
  html,
  state: { attrs },
}: EnhanceElementArgs): EnhanceElementResult {
  const todoId = attrs["todo-id"];
  const completed = typeof attrs.completed === "string";
  const myHtml: EnhanceHtmlFunction = html;

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

</td>
</tr>
</table>

### Head Function

<table>
<tr>
<td valign="top">

#### With JSDoc comments in `.mjs`

```js
/**
 * @type {import('@enhance/types').EnhanceHeadFunction}
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

</td>
<td valign="top">

#### With `.ts`

```ts
import type {
  EnhanceApiRequest,
  EnhanceElementResult,
  EnhanceHeadFunction,
} from "@enhance/types";

const Head: EnhanceHeadFunction = function (
  request: EnhanceApiRequest,
): EnhanceElementResult {
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

</td>
</tr>
</table>
