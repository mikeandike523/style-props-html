# style-props-html

A library that facilitates passing CSS styles as regular props using a collection of custom components that mirror traditional DOM elements.

## Overview

This library creates a collection of React components that enhance the built in html tags with the ability to take in CSS stylings as props. Each custom component is represented by capitalizing the first letter of the corresponding html tag.

For instance,

| HTML Tag | Component Name |
| -------- | -------------- |
| `<a>`    | `<A>`          |
| `<div>`  | `<Div>`        |
| `<span>` | `<Span>`       |
| ...      | ...            |

## Compatibility

This library is Typescript and Javascript compatible. Of course, I recommend Typescript.

## Basic Example

```tsx

// Typescript

import { Div, Nav, Main, H1, H2, P } from 'style-props-html';

export default function HomePage(){
    return (
        <Div
        position="fixed"
        width="100vw"
        height="100vh"
        margin={0}
        padding={0}
        boxSizing="border-box"
        background="skyblue"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="8px"
        >
            <Nav
            width="100%"
            padding="4px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            >
                <H1>My Homepage</H1>
                <H2>The Best Homepage</H2>
            </Nav>
            <Main
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <H1>Welcome to my home page!</H1>
                <P>I am a small freelance developer in the town of...</P>
            </Main>
        <Div>
    );
}

```

## Emotion React `css` Prop Requirement

This library relies on the use of `@emotion/react` and it's `css` prop.

To enable the css prop, your project
needs to use `@emotion/react` as it's `jsxImportSource`. This is because the `css` prop is not present by default in plain JSX or React.

In Typescript projects, this is is as easy as including the `jsxImportSource` in your tsconfig settings.

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

Most bundlers (such as vite and nextjs) will automatically detect this settings and handle the `css` prop appropriately.

However if you have a Javascript project, you may need to directly configure the compiler or bundler settings to modify `jsxImportSource`. In all cases, consider adding a `.tsconfig` or `.jsconfig` to your Javascript projects to assist with autocomplete and suggestions in your IDE.

_Note: This may change as an improvement in future versions. However the work required to implement a system independent of the `css` prop is excessive at this time._

## Full Compatibility With Other Styling Methods

This library is fully compatible with inline styles, CSS class names, and the Emotion CSS `css` prop. If the same CSS property is present in the `css` prop and the style props, the style props will override. Under the hood, it is string concatenation. The style props are assembled into an Emotion `SerializedStyles` object and concatenated to the existing css prop, potentially leading to duplicate properties. However n CSS, a repeated property below will override one above. Nevertheless is is not good practice to duplicate a property between style props and the `css` prop.

JSX `className` (CSS classes) and `style` props (inline styles) are unaffected, allowing inline styles and libraries such as Tailwind to be used as normal.

## Known Issue -- Incompatible With Chakra UI

It may depend on your specific project setup, but there is a known compatibility issue in the `css` prop when attempting to use this library in conjunction Chakra UI. One tends to get error `union is too complex to represent`. I believe this is due to complexity of how Chakra UI manages its internal usage of the `@emotion/react` library as well as its internal implementation of its style props system and `as` prop.

Generally, there is really no reason to use this library in conjunction with Chakra UI. Chakra UI has its own built in style prop and theming systems. The purpose of this library is to provide an alternative that is more lightweight and does not come with any opinionated components, styles, or theming behavior.

## Ref-Forwarding and Higher Order Components

Each component in this library has ref-forwarding enabled. This means that it behaves identically to the baseline DOM element with respect to React's `ref` prop.

In your project it may also be useful to perform your own ref-forwarding to extend components in this library. Here is a comprehensive Example.

### Example -- AspectSensitiveCanvas

**! WARNING !**
This code was generate by ChatGPT and is not yet tested. I plan to test it soon. Use this example only as a demonstration of ideas.

```ts
import React, { useEffect, useRef, forwardRef } from "react";
import { Canvas, CanvasProps } from "style-props-html";

// Helper class to manage coordinate transformations and extents
class AspectSensitiveCoordinateHelper {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  // Update dimensions
  updateDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  // Get the extent of the X-axis (normalized space based on aspect ratio)
  getExtentX() {
    return this.width > this.height ? this.width / this.height : 1.0;
  }

  // Get the extent of the Y-axis (normalized space based on aspect ratio)
  getExtentY() {
    return this.height > this.width ? this.height / this.width : 1.0;
  }

  // Convert normalized coordinates to pixel space
  normalizedToPixel(x: number, y: number): [number, number] {
    const extentX = this.getExtentX();
    const extentY = this.getExtentY();
    return [
      (x + extentX) * (this.width / (2 * extentX)),
      (extentY - y) * (this.height / (2 * extentY)),
    ];
  }

  // Convert pixel space to normalized coordinates
  pixelToNormalized(x: number, y: number): [number, number] {
    const extentX = this.getExtentX();
    const extentY = this.getExtentY();
    return [
      x / (this.width / (2 * extentX)) - extentX,
      extentY - y / (this.height / (2 * extentY)),
    ];
  }
}

export interface AspectSensitiveCanvasProps
  extends Omit<CanvasProps, "width" | "height"> {
  drawRoutine: (
    ctx: CanvasRenderingContext2D | null,
    coordinateHelper: AspectSensitiveCoordinateHelper
  ) => void;
  running?: boolean;
}

const AspectSensitiveCanvas = forwardRef<
  HTMLCanvasElement,
  AspectSensitiveCanvasProps
>(
  (
    { drawRoutine, running = true, ...rest }: AspectSensitiveCanvasProps,
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const coordinateHelper = useRef<AspectSensitiveCoordinateHelper>(
      new AspectSensitiveCoordinateHelper(0, 0)
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const resizeObserver = new ResizeObserver(() => {
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        coordinateHelper.current.updateDimensions(width, height);
        if (running) {
          drawRoutine(ctx, coordinateHelper.current);
        }
      });

      resizeObserver.observe(canvas);

      // Initial setup
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      coordinateHelper.current.updateDimensions(width, height);
      if (running) {
        drawRoutine(ctx, coordinateHelper.current);
      }

      return () => resizeObserver.disconnect();
    }, [drawRoutine, running]);

    return (
      <Canvas
        ref={ref || canvasRef}
        cssWidth="100%"
        cssHeight="100%"
        {...rest}
      />
    );
  }
);

export default AspectSensitiveCanvas;
```

## Special Cases

Notice in the previous example the use of `cssWidth` and `cssHeight`? This is a special case. Some HTML elements have meaningful attributes that conflict with css attributes. For the sake of JSX integrity, in these cases the html attribute is prioritized and you can provide style props by prefacing with `css`. For instance `cssWidth` or `cssHeight`.

Here is a list of the special cases:

| Element | Conflicting Attributes |
| ------- | ---------------------- |
| canvas  | width, height          |
| img     | width, height          |
| iframe  | width, height          |
| video   | width, height          |
| svg     | width, height          |

## Release Status and Contribution

Currently this library is experimental(semantic major version 0).

I welcome contribution, especially that of ensuring the veracity of this library, testing our examples, providing additional examples, and alternative implementation such as ones that do not depend on the `css` prop.

If you encounter a bug or notice incomplete or incorrect configuration, please raise a github issue. If you want to collaborate, you can email me:

michaelsohnenacademic@gmail.com
