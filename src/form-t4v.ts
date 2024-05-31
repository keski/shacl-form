import { ShaclForm as FormBase } from "./form"
import { DefaultTheme } from "./themes/t4v"

export * from './exports'

export class ShaclForm extends FormBase {
    constructor() {
        super(new DefaultTheme())
    }
}

window.customElements.define('shacl-form', ShaclForm)
