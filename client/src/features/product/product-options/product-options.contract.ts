import { z } from 'zod';

type Option = { id: string; value: string };

const getDisplayValue = (
    data: string | { id: string; value: string }[]
): Option[] => {
    if (typeof data === 'string') {
        return [{ id: data, value: data }];
    }

    // Преобразование массива объектов с id в формат Option
    return data.map(item => ({ id: item.value, value: item.value }));
};

export const createSchema = (options: {
    size: string | Option[];
    usage: string | Option[];
    shade: string | Option[];
}) => {
    const { size, usage, shade } = options;

    const sizeOptions = getDisplayValue(size);
    const usageOptions = getDisplayValue(usage);
    const shadeOptions = getDisplayValue(shade);

    return z.object({
        size: z
            .enum(
                sizeOptions.map(option => option.value) as [string, ...string[]]
            )
            .refine(val => val !== '', {
                message: 'Пожалуйста, выберите размер.'
            })
            .refine(
                val => sizeOptions.map(option => option.value).includes(val),
                {
                    message: 'Недопустимое значение размера.'
                }
            ),
        usage: z
            .enum(
                usageOptions.map(option => option.value) as [
                    string,
                    ...string[]
                ]
            )
            .refine(val => val !== '', {
                message: 'Пожалуйста, выберите использование.'
            })
            .refine(
                val => usageOptions.map(option => option.value).includes(val),
                {
                    message: 'Недопустимое значение использования.'
                }
            ),
        shade: z
            .enum(
                shadeOptions.map(option => option.value) as [
                    string,
                    ...string[]
                ],
                {
                    required_error: 'Пожалуйста, выберите оттенок.'
                }
            )
            .refine(val => val !== '', {
                message: 'Пожалуйста, выберите оттенок.'
            })
            .refine(
                val => shadeOptions.map(option => option.value).includes(val),
                {
                    message: 'Недопустимое значение оттенка.'
                }
            )
    });
};
