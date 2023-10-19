import { DataFactory, Literal, NamedNode } from 'n3'
import { Term } from '@rdfjs/types'
import { PREFIX_SHACL, PREFIX_XSD, PREFIX_RDF } from './constants'
import { createInputListEntries, findInstancesOf } from './util'
import { ShaclPropertyTemplate } from './property-template'

let idCtr = 0

export type Editor = HTMLElement & { value: string }
export type InputListEntry = { value: Term | string, label?: string }
export abstract class Theme {
    abstract createListEditor(template: ShaclPropertyTemplate, listEntries: InputListEntry[], value?: Term): HTMLElement
    abstract createLangStringEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement
    abstract createTextEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement
    abstract createNumberEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement
    abstract createDateEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement
    abstract createBooleanEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement
    createDefaultTemplate(template: ShaclPropertyTemplate, editor: Editor, value?: Term): HTMLElement {
        editor.id = `e${idCtr++}`
        editor.classList.add('editor', 'form-control')
        if (template.datatype) {
            // store datatype on editor, this is used for RDF serialization
            editor['shacl-datatype'] = template.datatype
        }
        if (template.minCount !== undefined) {
            editor.dataset.minCount = String(template.minCount)
        }
        if (template.class) {
            editor.dataset.class = template.class.value
        }
        if (template.nodeKind) {
            editor.dataset.nodeKind = template.nodeKind.value
        }
        editor.value = value?.value || template.defaultValue?.value || ''
    
        const label = document.createElement('label')
        label.htmlFor = editor.id
        label.innerText = template.label
        if (template.description) {
            label.setAttribute('title', template.description.value)
        }
    
        const placeholder = template.description ? template.description.value : template.pattern ? template.pattern : null
        if (placeholder) {
            editor.setAttribute('placeholder', placeholder)
        }
        if (template.minCount !== undefined && template.minCount > 0) {
            editor.setAttribute('required', 'true')
            label.classList.add('required')
        }
    
        const result = document.createElement('div')
        result.classList.add('property-instance')
        result.appendChild(label)
        result.appendChild(editor)
        return result
    }
}
export class NativeTheme extends Theme {
    createDateEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement {
        const editor = document.createElement('input')
        if (template.datatype?.value  === PREFIX_XSD + 'dateTime') {
            editor.type = 'datetime-local'
        }
        else {
            editor.type = 'date'
        }
        editor.classList.add('pr-0')
        const result = this.createDefaultTemplate(template, editor)
        if (value) {
            let isoDate = new Date(value.value).toISOString()
            if (template.datatype?.value  === PREFIX_XSD + 'dateTime') {
                isoDate = isoDate.slice(0, 19)
            } else {
                isoDate = isoDate.slice(0, 10)
            }
            editor.value = isoDate
        }
        return result
    }

    createTextEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement {
        let editor
        if (template.singleLine === false) {
            editor = document.createElement('textarea')
            editor.rows = 5
        }
        else {
            editor = document.createElement('input')
            editor.type = 'text'
        }
    
        if (template.minLength) {
                editor.minLength = template.minLength
            }
        if (template.maxLength) {
            editor.maxLength = template.maxLength
        }
        if (template.pattern) {
            editor.pattern = template.pattern
        }
        return this.createDefaultTemplate(template, editor, value)
    }

    createLangStringEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement {
        const result = this.createTextEditor(template, value)
        const editor = result.querySelector(':scope .editor') as Editor
        let langChooser
        if (template.languageIn?.length) {
            langChooser = document.createElement('select')
            for (const lang of template.languageIn) {
                const option = document.createElement('option')
                option.innerText = lang.value
                langChooser.appendChild(option)
            }
        } else {
            langChooser = document.createElement('input')
            langChooser.maxLength = 5 // e.g. en-US
        }
        langChooser.title = 'Language of the text'
        langChooser.placeholder = 'lang?'
        langChooser.classList.add('lang-chooser')
        // if lang chooser changes, fire a change event on the text input instead. this is for shacl validation handling.
        langChooser.addEventListener('change', (ev) => {
            ev.stopPropagation();
            if (editor) {
                editor.dataset.lang = langChooser.value
                editor.dispatchEvent(new Event('change', { bubbles: true }))
            }
        })
        if (value instanceof Literal) {
            langChooser.value = value.language
        }
        editor.dataset.lang = langChooser.value
        editor.after(langChooser)
        return result
    }

    createBooleanEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement {
        const editor = document.createElement('input')
        editor.type = 'checkbox'
        editor.classList.add('ml-0')
    
        const result = this.createDefaultTemplate(template, editor, value)
    
        // 'required' on checkboxes forces the user to tick the checkbox, which is not what we want here
        editor.removeAttribute('required')
        result.querySelector(':scope label')?.classList.remove('required')
        if (value instanceof Literal) {
            editor.checked = value.value === 'true'
        }
        return result
    }

    createNumberEditor(template: ShaclPropertyTemplate, value?: Term): HTMLElement {
        const editor = document.createElement('input')
        editor.type = 'number'
        editor.classList.add('pr-0')
        const min = template.minInclusive ? template.minInclusive : template.minExclusive ? template.minExclusive + 1 : undefined
        const max = template.maxInclusive ? template.maxInclusive : template.maxExclusive ? template.maxExclusive - 1 : undefined
        if (min) {
            editor.min = String(min)
        }
        if (max) {
            editor.max = String(max)
        }
        if (template.datatype?.value !== PREFIX_XSD + 'integer') {
            editor.step = '0.1'
        }
        return this.createDefaultTemplate(template, editor, value)
    }

    createListEditor(template: ShaclPropertyTemplate, listEntries: InputListEntry[], value?: Term): HTMLElement {
        const editor = document.createElement('select')
        const result = this.createDefaultTemplate(template, editor)
        // add an empty element
        const emptyOption = document.createElement('option')
        emptyOption.value = ''
        editor.options.add(emptyOption)
    
        for (const item of listEntries) {
            const option = document.createElement('option')
            const itemValue = (typeof item.value === 'string') ? item.value : item.value.value
            option.innerHTML = item.label ? item.label : itemValue
            option.value = itemValue
            if (value && value.value === itemValue) {
                option.selected = true
            }
            editor.options.add(option)
        }
        if (value) {
            editor.value = value.value
        }
        return result
    }
}

export function toRDF(editor: Editor): Literal | NamedNode | undefined {
    let datatype = editor['shacl-datatype']
    let value: number | string = editor.value
    if (value) {
        if (editor.dataset.class || editor.dataset.nodeKind === PREFIX_SHACL + 'IRI') {
            return DataFactory.namedNode(value)
        } else {
            if (editor.dataset.lang) {
                datatype = editor.dataset.lang
            }
            else if (editor['type'] === 'number') {
                value = parseFloat(value)
            }
            return DataFactory.literal(value, datatype)
        }
    } else if (editor['type'] === 'checkbox') {
        // emit boolean 'false' only when required
        if (editor['checked'] || parseInt(editor.dataset.minCount || '0') > 0) {
            return DataFactory.literal(editor['checked'] ? 'true' : 'false', datatype)
        }
    }
}

export function editorFactory(template: ShaclPropertyTemplate, value?: Term): HTMLElement {
    // if we have a class, find the instances and display them in a list
    if (template.class) {
        return template.config.theme.createListEditor(template, findInstancesOf(template.class, template.config), value)
    }

    // check if it is a list
    if (template.shaclIn) {
        const list = template.config.lists[template.shaclIn]
        if (list?.length) {
            return template.config.theme.createListEditor(template, createInputListEntries(list, template.config.shapesGraph, template.config.attributes.language), value)
        }
        else {
            console.error('list not found:', template.shaclIn, 'existing lists:', template.config.lists)
        }
    }

    // check if it is a langstring
    if  (template.datatype?.value === `${PREFIX_RDF}langString` || template.languageIn?.length) {
        return template.config.theme.createLangStringEditor(template, value)
    }

    switch (template.datatype?.value.replace(PREFIX_XSD, '')) {
        case 'string':
            return template.config.theme.createTextEditor(template, value)
        case 'integer':
        case 'float':
        case 'double':
        case 'decimal':
            return template.config.theme.createNumberEditor(template, value)
        case 'date':
        case 'dateTime':
            return template.config.theme.createDateEditor(template, value)
        case 'boolean':
            return template.config.theme.createBooleanEditor(template, value)
        }

    // nothing found, fallback to 'text'
    return template.config.theme.createTextEditor(template, value)
}