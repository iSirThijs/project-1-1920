import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'

export default {
	input: 'src/app.js',
	output: {
		file: 'docs/scripts/main.js',
		format: 'umd',
		sourcemap: true
	},
	watch: {
		exclude: 'node_modules/**'
	},
	plugins: [
		alias({
			entries: {
				modules: 'src/modules',
				components: 'src/components',
				pages: 'src/pages',
				templates: 'src/templates'
			}
		}),
		...process.env.BUILD === 'dev' ? [serve('docs')] : []
	]
}