module.exports = function(api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];

  const plugins = [
    [
      'module-resolver',
      {
        assets: ['./assets/fonts'],
        // 루트 파일에서도 alias 사용하려면 './' 포함 권장
        root: ['./src', './'],
        extensions: [
          '.web.tsx', '.web.ts', '.ios.ts', '.android.ts', '.ts',
          '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@query': './src/query'
        }
      }
    ]
    // (필요한 다른 플러그인을 여기에 추가)
  ];

  if (process.env.BUILD_TARGET === 'web') {
    presets.push(
      ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] }, modules: false, useBuiltIns: false }],
      '@babel/preset-react',
      '@babel/preset-typescript'
    );

    // react-native 패키지의 Flow 타입을 제거해서 파싱 에러 방지
    plugins.push('@babel/plugin-transform-flow-strip-types');

    // react-native-reanimated를 사용중이면 아래 플러그인을 반드시 맨 마지막에 추가해야 함
    // plugins.push('react-native-reanimated/plugin');
  }

  return { presets, plugins };
};