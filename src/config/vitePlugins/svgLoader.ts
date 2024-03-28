import { Plugin } from 'vite';
import { Config } from 'svgo';
import { readFileSync } from 'node:fs';
import { optimize as optimizeSvg } from 'svgo';
import { compileTemplate } from 'vue/compiler-sfc';

// Оригинальный компонент тут
// https://github.com/jpkleemans/vite-svg-loader/blob/main/index.js
// Был переписан потому что при ?raw не обрабатываел svgo

export default function svgLoader (
    options: {
        defaultImport?: 'url' | 'raw' | 'component'
        svgo?: boolean,
        svgoConfig?: Config,
    } = {
        defaultImport: 'url'
    }
): Plugin {
    const { svgoConfig, svgo, defaultImport } = options;

    const svgRegex = /\.svg(\?(raw|component|skipsvgo))?$/

    return {
        name: 'svg-loader',
        enforce: 'pre',

        async load (id: string) {
            if (!svgRegex.test(id)) {
                return
            }

            const [path, query] = id.split('?', 2)

            const importType = query || defaultImport

            if (importType === 'url') {
                return; // Use default svg loader
            }

            let svg

            try {
                svg = readFileSync(path, 'utf-8');
            } catch {
                console.error('\n', `${id} couldn't be loaded by vite-svg-loader, fallback to default loader`)
                return
            }

            if (svgo !== false && query !== 'skipsvgo') {
                svg = optimizeSvg(svg, {
                    ...svgoConfig,
                    path
                }).data
            }

            if (importType === 'raw') {
                return `export default ${JSON.stringify(svg)}`
            }

            // To prevent compileTemplate from removing the style tag
            svg = svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, '</component')

            const { code } = compileTemplate({
                id: JSON.stringify(id),
                source: svg,
                filename: path,
                transformAssetUrls: false
            })

            return `${code}\nexport default { render: render }`
        }
    }
}
