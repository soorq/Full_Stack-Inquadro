export const sortOptions: { [key: string]: { by: string; order: string } } = {
    available: { by: 'price', order: 'ASC' },
    premium: { by: 'price', order: 'DESC' },
    new: { by: 'createdAt', order: 'DESC' },
    popularity: { by: 'article', order: 'ASC' }
};
