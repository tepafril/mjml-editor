export interface TemplateVariable {
  label: string
  value: string
}

export interface TemplateVariableGroup {
  group: string
  variables: TemplateVariable[]
}

export const TEMPLATE_VARIABLES: TemplateVariableGroup[] = [
  {
    group: 'Contact',
    variables: [
      { label: 'First Name', value: 'contact.first_name' },
      { label: 'Last Name', value: 'contact.last_name' },
      { label: 'Email', value: 'contact.email' },
      { label: 'Phone', value: 'contact.phone' },
      { label: 'Address', value: 'contact.address' },
    ],
  },
  {
    group: 'Company',
    variables: [
      { label: 'Company Name', value: 'company.name' },
      { label: 'Website', value: 'company.website' },
      { label: 'Logo URL', value: 'company.logo_url' },
    ],
  },
  {
    group: 'Other',
    variables: [
      { label: 'Current Date', value: 'current_date' },
      { label: 'Unsubscribe URL', value: 'unsubscribe_url' },
    ],
  },
]
