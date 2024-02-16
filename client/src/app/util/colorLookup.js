import { DEFAULT_THEME } from "@mantine/core";

const colorMap = new Map();
colorMap.set("#495057", DEFAULT_THEME.colors.gray);
colorMap.set("#f03e3e", DEFAULT_THEME.colors.red);
colorMap.set("#d6336c", DEFAULT_THEME.colors.pink);
colorMap.set("#ae3ec9", DEFAULT_THEME.colors.grape);
colorMap.set("#7048e8", DEFAULT_THEME.colors.violet);
colorMap.set("#4263eb", DEFAULT_THEME.colors.indigo);
colorMap.set("#1c7ed6", DEFAULT_THEME.colors.blue);
colorMap.set("#1098ad", DEFAULT_THEME.colors.cyan);
colorMap.set("#0ca678", DEFAULT_THEME.colors.teal);
colorMap.set("#37b24d", DEFAULT_THEME.colors.green);
colorMap.set("#74b816", DEFAULT_THEME.colors.lime);
colorMap.set("#f59f00", DEFAULT_THEME.colors.yellow);
colorMap.set("#f76707", DEFAULT_THEME.colors.orange);

function getColorArrayFromHex(hexValue) {
  return colorMap.get(hexValue);
}
export default getColorArrayFromHex;
