import { useTranslation } from "react-i18next"

export default function useComponentTranslation(componentPath) {
    const { t, i18n } = useTranslation();
    function translate(code, options) {
        const mergedPath = `${componentPath}.${code}`;
        const translation = t(mergedPath, options);
        return translation !== mergedPath ? translation : t(code, options);
    }
    return { t: translate, i18n };
}