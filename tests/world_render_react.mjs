const no = () => {
  throw new Error('the world harness renders no React; only worldOf and mountWorld are used')
}
export const jsx = no
export const jsxs = no
export const useCallback = no
export const useEffect = no
export const useLayoutEffect = no
export const useMemo = no
export const useRef = no
export const useState = no
export default { createElement: no }
