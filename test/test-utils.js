import { render } from '@testing-library/react-native'
import '../i18n/i18n'

const customRender = (ui, options) => render(ui, { ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
