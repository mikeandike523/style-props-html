# style-props-html

A library that enables the specification of css properties as regular props of HTML elements

## Inspiration

This library was inspired by Chakra UI's `Box` component and style-props system. However the drawback of using Chakra UI for style props is the additional overhead as well as Chakra UI's build in theme value interpolation.

```typescript
import { box } from "@chakra-ui/react";

// Chakra UI Example
export default function MyComponent() {
  return <Box as="span">Hello World!</Box>;
}
```

## Warning - Emotion CSS Prop

This library uses the emotion `css` prop internally. To ensure maximum compatibility, it is recommended to set your bundler or toolchain to use "@emotion/react" as the `jsxImportSource`.
This is easy in typescript, but if your project uses javascript, you may need to modify settings in any bundler configs you use. Consider adding a tsconfig even if your project is pure javascript for improved intellisense and type checking.

There is a chance you can get your project to work without `css` prop support, but it is not recommended.

## Warning - Not Compatible with Chakra UI

Using standalone "@emotion/react" and "@chakra-ui/react" together seems to lead to type conflicts in the `css` prop. One tends to get the error `union is to complex to represent`. This is likely due to the internal complexity of Chakra UI and how it handles the `css` prop and its own internal usage of "@emotion/react". It is not recommended to use these libraries together. However that should not be a problem as Chakra UI already has its own style prop system. This library is meant for those that do not want to use Chakra UI but like the cleanliness of style props.

```jsonc
{
  "jsxImportSource": "@emotion/react",
  "types": ["@emotion/react/types/css-prop"]
}
```

## Overview

For every html tag (as of Wed, Dec. 11, 2024), we establish a corresponding react component in Pascal/UpperCamel case that serves as a wrapper around the original element with the capability to specify style props as regular props.

The package is compatible with **Javascript and Typescript**. Of course, I always personally recommend Typescript.

Contrived Example:

```typescript
// Typescript

import { Main, P, A } from "style-props-html";
import { css } from "@emotion/react";

export default function HomePage() {
  // Classnames, tailwind, and emotion css prop remain operational

  const theme = "light";

  return (
    <Main
      className="my-tailwind-class my-custom-class"
      css={css`
        display: block;
      `}
      border="2px solid black"
      backgroundColor={theme === "light" ? "skyblue" : "darkgray"}
    >
      <P>
        Welcome to my homepage. Click
        <A href="/portfolio" fontSize="200%" fontWeight="bold">
          here
        </A> to see my portfolio!
      </P>
    </Main>
  );
}
```

## Internal Ref Forwarding

All of the components in this library support ref forwarding. In essence, this means they behave akin to regular html elements with regards to the `ref` prop.

Here is an example to establish a canvas for a 2D game that can account for changes in size. I.e. the coordinate system which the drawing context uses will reflect current size of canvas on page.

```typescript
// Typescript

import { useRef, useEffect } from "react";
import { css } from "@emotion/react";

import { Div, Canvas } from "style-props-html";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function updateCanvasIntrinsicSize() {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  }

  useEffect(updateCanvasIntrinsicSize, [canvasRef.current]);

  useEffect(function () {
    window.addEventListener("resize", updateCanvasIntrinsicSize);
    return function () {
      window.removeEventListener("resize", updateCanvasIntrinsicSize);
    };
  }, []);

  return (
    <Div
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Canvas
        ref={canvasRef}
        width="0"
        height="0"
        css={css`
          width: 100%;
          height: 100%;
        `}
      ></Canvas>
    </Div>
  );
}
```

### Creating HOCs with Ref Forwarding

If you want to, you can create components that themselves are ref forwarding compatible and incorporate components from this library.

For instance, we can modify our `GameCanvas` component to enable ref-forwarding and behave like an `HTMLDivElement`.

```typescript
// Typescript

import { useRef, useEffect, forwardRef } from "react";
import { css } from "@emotion/react";

import { Div, Canvas } from "style-props-html";

export interface GameCanvasProps {}

export default forwardRef<HTMLDivElement, GamveCanvasProps>(function GameCanvas(
  {}: GameCanvasProps,
  forwardedRef
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function updateCanvasIntrinsicSize() {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  }

  useEffect(updateCanvasIntrinsicSize, [canvasRef.current]);

  useEffect(function () {
    window.addEventListener("resize", updateCanvasIntrinsicSize);
    return function () {
      window.removeEventListener("resize", updateCanvasIntrinsicSize);
    };
  }, []);

  return (
    <Div
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      ref={forwardedRef}
    >
      <Canvas
        ref={canvasRef}
        width="0"
        height="0"
        css={css`
          width: 100%;
          height: 100%;
        `}
      ></Canvas>
    </Div>
  );
});
```
