import { PromoCodeForm } from './promo-code.form';

export const PromoCode = () => {
    return (
        <div className="bg-secondary w-full h-auto rounded-[10px] p-4 mb-5">
            <p className="text-base sm:text-lg leading-5 text-black/50 mb-2.5">
                Промокод со скидками и (или) бонусами
            </p>
            <PromoCodeForm />
        </div>
    );
};
