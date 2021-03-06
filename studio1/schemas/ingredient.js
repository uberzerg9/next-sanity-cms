export default {
    name: 'ingredient',
    title: 'Ingredient',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Ingedient Name',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            option: {
                hotspot: true
            }
        },
        {
            name: 'notes',
            title: 'Notes',
            type: 'text'
        }
    ]
}