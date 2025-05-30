import { defineConfig } from "tsup";

export default defineConfig({
  target: "esnext",
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  entry: [
    "src/main.ts",
  ],
});
