import html from "rollup-plugin-html";
import { eslint } from "rollup-plugin-eslint";
import acornStaticClassFeatures from "acorn-static-class-features";
import acornPrivateMethods from "acorn-private-methods";
import acornPrivateClassElements from "acorn-private-class-elements";
import acornClassFields from "acorn-class-fields";

export default {
  acorn: {
    ecmaVersion: "10"
  },
  acornInjectPlugins: [
    acornClassFields,
    acornStaticClassFeatures,
    acornPrivateMethods,
    acornPrivateClassElements
  ],
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "esm"
  },
  plugins: [
    html({
      include: "**/*.html"
    }),
    eslint(), 
  ]
};
