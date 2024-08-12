import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="w-full h-full py-10 bg-primary text-white">
            <div className="container w-full h-full">
                <div className="flex justify-between items-center">
                    <Image
                        src="/logo/logo.png"
                        alt=""
                        width={150}
                        height={50}
                    />
                    <div className="flex items-center gap-2.5">
                        <Link href="/" rel="norefferer nopener">
                            <svg
                                className="[&>path]:hover:fill-white/50 [&>path]:transition-colors [&>path]:fill-white"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.96824 1.96824C0 3.93648 0 7.1043 0 13.44V14.56C0 20.8957 0 24.0635 1.96824 26.0318C3.93648 28 7.1043 28 13.44 28H14.56C20.8957 28 24.0635 28 26.0318 26.0318C28 24.0635 28 20.8957 28 14.56V13.44C28 7.1043 28 3.93648 26.0318 1.96824C24.0635 0 20.8957 0 14.56 0H13.44C7.1043 0 3.93648 0 1.96824 1.96824ZM4.72507 8.51672C4.87674 15.7967 8.51672 20.1717 14.8984 20.1717H15.2601V16.0067C17.6051 16.2401 19.3783 17.9551 20.09 20.1717H23.4034C22.4934 16.8584 20.1016 15.0267 18.6083 14.3267C20.1016 13.4634 22.2016 11.3634 22.7033 8.51672H19.6932C19.0399 10.8267 17.1034 12.9267 15.2601 13.1251V8.51672H12.25V16.5901C10.3833 16.1234 8.02672 13.8601 7.92172 8.51672H4.72507Z"
                                />
                            </svg>
                        </Link>
                        <Link href="/" rel="norefferer nopener">
                            <svg
                                className="[&>path]:hover:fill-white/50 [&>path]:transition-colors [&>path]:fill-white"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM14.5017 10.3354C13.14 10.9018 10.4185 12.0741 6.33721 13.8522C5.67447 14.1158 5.3273 14.3736 5.2957 14.6257C5.24228 15.0517 5.77583 15.2195 6.50238 15.448C6.60121 15.4791 6.70361 15.5113 6.80859 15.5454C7.52341 15.7777 8.48496 16.0496 8.98484 16.0604C9.43827 16.0702 9.94435 15.8832 10.5031 15.4996C14.3164 12.9255 16.2848 11.6244 16.4084 11.5964C16.4955 11.5766 16.6164 11.5517 16.6982 11.6245C16.7801 11.6972 16.772 11.835 16.7634 11.872C16.7105 12.0973 14.6161 14.0444 13.5323 15.0521C13.1944 15.3662 12.9548 15.589 12.9058 15.6399C12.796 15.7539 12.6841 15.8617 12.5766 15.9654C11.9126 16.6055 11.4146 17.0856 12.6042 17.8696C13.1759 18.2463 13.6334 18.5579 14.0898 18.8687C14.5882 19.2081 15.0853 19.5466 15.7285 19.9683C15.8924 20.0757 16.0489 20.1873 16.2014 20.2959C16.7814 20.7095 17.3025 21.081 17.9464 21.0217C18.3204 20.9873 18.7069 20.6355 18.9031 19.5864C19.3669 17.107 20.2786 11.7349 20.4893 9.52114C20.5077 9.32718 20.4845 9.07897 20.4658 8.97C20.4472 8.86104 20.4082 8.70579 20.2666 8.59087C20.0989 8.45476 19.8399 8.42606 19.7241 8.4281C19.1975 8.43737 18.3896 8.71829 14.5017 10.3354Z"
                                    fill="white"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="flex mt-10 mb-5 flex-col md:flex-row gap-5">
                    <ul className="md:w-1/4 [&>li]:mb-1">
                        <li className="">
                            <Link href="">о компании</Link>
                        </li>
                        <li className="">
                            <Link href="">подарочная карта</Link>
                        </li>
                        <li className="">
                            <Link href="">партнерская программа</Link>
                        </li>
                        <li className="">
                            <Link href="">акционная программа</Link>
                        </li>
                        <li className="">
                            <Link href="">контактная информация</Link>
                        </li>
                    </ul>

                    <ul className="md:w-2/4 [&>li]:mb-1">
                        <li>
                            <Link href="/">
                                условия обработки персональных данных
                            </Link>
                        </li>
                        <li>
                            <Link href="/">условия обработки файлов куки</Link>
                        </li>
                        <li>
                            <Link href="/">условия доставки товаров</Link>
                        </li>
                        <li>
                            <Link href="/">публичная оферта</Link>
                        </li>
                    </ul>
                    <div className="md:w-1/4 flex flex-col md:text-right">
                        <Link
                            href="tel:+78008001010"
                            rel="noopener noreferrer"
                            className="text-xl"
                        >
                            +7 800 800 10 10
                        </Link>
                        <Link
                            href="mailto:info@inquadra.ru"
                            rel="noopener noreferrer"
                            className="text-xl"
                        >
                            info@inquadra.ru
                        </Link>
                    </div>
                </div>

                <div className="flex md:items-end flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/4">
                        <Link href="/policy" className="mb-1">
                            пользовательское соглашение
                        </Link>
                        <p className="text-white/20">
                            {new Date().getFullYear()} ⓒ все права защищены
                        </p>
                    </div>

                    <p className="text-white/20">
                        ооо «мегаполис» · огрн: 1205000032192
                    </p>
                </div>
            </div>
        </footer>
    );
};
