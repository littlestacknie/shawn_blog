import { defineConfig } from 'dumi';

const repo = 'shawn_blog';

export default defineConfig({
  title: "Shawn's Castle",
  favicon: '🏰',
  logo: '/logo.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/littlestacknie/shawn_blog',
    },
  ],
});
