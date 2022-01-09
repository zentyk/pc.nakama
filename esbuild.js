require('esbuild').build({
    entryPoints: ['./src/nakama.js'],
    bundle: true,
    sourcemap : true,
    target : 'es2015',
    format:'esm',
    outfile: './dist/dev/pc-nakama.js',
  }).catch(() => process.exit(1))

  require('esbuild').build({
    entryPoints: ['./src/nakama.ts'],
    bundle: true,
    sourcemap : true,
    target : 'es2015',
    format:'esm',
    outfile: './dist/dev/nakama.js',
  }).catch(() => process.exit(1))

