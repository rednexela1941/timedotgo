#!/usr/bin/node
import { execSync } from "child_process";
import * as lib_esbuild from "esbuild";
import fs from "node:fs";

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

async function main() {
  const BannerString = `gotime ${new Date().getFullYear()}`;

  const PRODUCTION = true;

  const buildOpts = {
    entryPoints: ["dist/index.js"],
    // entryNames: '[dir]/[name]-[hash]',
    bundle: true,
    minify: true,
    platform: "neutral",
    treeShaking: false,
    splitting: false,
    sourcemap: false,
    format: "esm",
    target: "esnext",
    outdir: "./out/",
    banner: {
      js: `/** ${BannerString} **/`,
    },
    metafile: true,
    // define: lEnv,
    /* preact jsx setup */
    // jsxFactory: "h",
    // jsxFragment: "Fragment",
  };
  const result = await lib_esbuild.build(buildOpts);
  if (result.errors.length || result.warnings.length) {
    console.log("Errors: ", result.errors);
    console.log("Warnings: ", result.warnings);
    return;
  }
  const buildOutputs = result.metafile.outputs;
  console.log("esbuild output");
  Object.keys(buildOutputs).forEach(function (pOutput) {
    const bytes = buildOutputs[pOutput].bytes;
    if (/map$/gim.exec(pOutput)) return /* ignore map files */;
    const entry = buildOutputs[pOutput].entryPoint || "";
    console.log(`\t${pOutput}`, bytesToSize(bytes));
    if (entry) {
      console.log(`\t\t${entry}`);
    }
  });
}
main();
