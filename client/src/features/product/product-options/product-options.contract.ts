import { z } from 'zod';

type Option = { label: string; value: string };

export const createSchema = (options: {
    sizes: Option[];
    usage: Option[];
    shades: Option[];
}) => {
    const { sizes, usage, shades } = options;

    return z.object({
        size: z
            .enum(sizes.map(option => option.value) as [string, ...string[]])
            .refine(val => val !== '', {
                message: 'Пожалуйста, выберите размер.'
            })
            .refine(val => sizes.map(option => option.value).includes(val), {
                message: 'Недопустимое значение размера.'
            }),
        usage: z
            .enum(usage.map(option => option.value) as [string, ...string[]])
            .refine(val => val !== '', {
                message: 'Пожалуйста, выберите использование.'
            })
            .refine(val => usage.map(option => option.value).includes(val), {
                message: 'Недопустимое значение использования.'
            }),
        shade: z
            .enum(shades.map(option => option.value) as [string, ...string[]], {
                required_error: 'Пожалуйста, выберите оттенок.'
            })
            .refine(val => val !== '', {
                message: 'Пожалуйста, выберите оттенок.'
            })
            .refine(val => shades.map(option => option.value).includes(val), {
                message: 'Недопустимое значение оттенка.'
            })
    });
};
