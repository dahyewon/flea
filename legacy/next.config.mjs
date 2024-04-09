/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: (() => {
    let compilerConfig = {
      styledComponents: true,
    }

    if (process.env.NODE_ENV === 'production') {
      compilerConfig = {
        ...compilerConfig,
        // 프로덕션 환경에서는 리액트 테스팅 라이브러리에서 사용하는 data-testid 속성을 삭제
        reactRemoveProperties: { properties: ['^data-testid$'] },
      }
    }

    return compilerConfig
  })(),
};

export default nextConfig;
