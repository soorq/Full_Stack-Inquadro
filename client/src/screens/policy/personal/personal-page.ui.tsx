import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '~&/src/shared/ui/breadcrumb';
import { Footer } from '~&/src/widgets/footer';
import { Header } from '~&/src/widgets/header';

export const PersonalPage = () => {
    return (
        <>
            <Header />
            <main className="container w-full min-h-[55dvh]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Обработка персональных данных
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <section className="w-full h-full my-14">
                    <h1 className="text-3xl font-bold uppercase">
                        политика конфиденциальности
                    </h1>
                    <p className="mt-7 mb-5 text-base leading-5 text-balance">
                        Настоящая Политика конфиденциальности (далее — Политика)
                        действует в отношении всей информации, которую проект
                        данные сайт и/или его аффилированные лица, могут
                        получить о пользователе во время использования им сайта
                        данного сайта.
                    </p>
                    <p className="my-5 text-base leading-5 text-balance">
                        Использование проекта inquadra.ru (https://inquadra.ru/)
                        (далее – данный сайт) означает безоговорочное согласие
                        пользователя с настоящей Политикой и указанными в ней
                        условиями обработки его персональной информации; в
                        случае несогласия с этими условиями пользователь должен
                        воздержаться от использования проекта. Проставляя
                        галочку о согласии с Политикой конфиденциальности,
                        Пользователь тем самым дает свое согласие на обработку
                        его персональных данных, указанных в Политике
                        конфиденциальности, и подтверждает, что положения данной
                        Политики конфиденциальности ему ясны.
                    </p>
                    <p className="my-5 text-base leading-5 text-balance">
                        Настоящая Политика конфиденциальности (далее — Политика)
                        действует в отношении всей информации, которую проект
                        данные сайт и/или его аффилированные лица, могут
                        получить о пользователе во время использования им сайта
                        данного сайта.
                    </p>
                    <ol className="list-counter leading-5 text-base space-y-2.5">
                        <li>
                            Персональная информация пользователей, которую
                            получает и обрабатывает данный сайт
                            <ol className="list-counter space-y-1">
                                <li>
                                    В рамках настоящей Политики под
                                    «персональной информацией пользователя»
                                    понимаются:
                                    <ol className="list-counter space-y-1">
                                        <li>
                                            Персональная информация, которую
                                            пользователь предоставляет о себе
                                            самостоятельно при регистрации
                                            (создании учётной записи),
                                            заполнении форм обратной связи,
                                            оформлении корзины с товарами, или в
                                            процессе использования сайта.
                                        </li>
                                        <li>
                                            Данные, которые автоматически
                                            передаются данным сайтом в процессе
                                            его использования с помощью
                                            установленного на устройстве
                                            пользователя программного
                                            обеспечения, в том числе IP-адрес,
                                            информация из cookie, информация о
                                            браузере пользователя (или иной
                                            программе, с помощью которой
                                            осуществляется доступ к сайту),
                                            время доступа, адрес запрашиваемой
                                            страницы.
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Настоящая Политика применима только к
                                    данному сайту. Мы не контролируем и не несем
                                    ответственности за сайты третьих лиц, на
                                    которые пользователь может перейти по
                                    ссылкам, доступным на данном сайте. На таких
                                    сайтах у пользователя может собираться или
                                    запрашиваться иная персональная информация,
                                    а также могут совершаться иные действия.
                                </li>
                                <li>
                                    Данный сайт в общем случае не проверяет
                                    достоверность персональной информации,
                                    предоставляемой пользователями, и не
                                    осуществляет контроль за их дееспособностью.
                                    Однако данный сайт исходит из того, что
                                    пользователь предоставляет достоверную и
                                    достаточную персональную информацию по
                                    вопросам, предлагаемым в форме регистрации,
                                    и поддерживает эту информацию в актуальном
                                    состоянии.
                                </li>
                            </ol>
                        </li>
                        <li>
                            Цели сбора и обработки персональной информации
                            пользователей
                            <ol className="list-counter space-y-1">
                                <li>
                                    Данный сайт собирает и хранит только те
                                    персональные данные, которые необходимы для
                                    оказания услуг (исполнения соглашений между
                                    ООО «МЕГАПОЛИС» и клиентом).
                                </li>
                                <li>
                                    Персональную информацию пользователя данный
                                    сайт может использовать в следующих целях:
                                    <ol className="list-counter space-y-1">
                                        <li>
                                            Идентификация стороны в рамках
                                            соглашений и договоров с данным
                                            сайтом;
                                        </li>
                                        <li>
                                            Предоставление пользователю
                                            персонализированных услуг и
                                            сервисов;
                                        </li>
                                        <li>
                                            Связь с пользователем, в том числе
                                            направление уведомлений, запросов и
                                            информации, касающихся использования
                                            сайта, оказания услуг, а также
                                            обработка запросов и заявок от
                                            пользователя;
                                        </li>
                                        <li>
                                            Улучшение качества данного сайта,
                                            удобства его использования,
                                            разработка новых сервисов и услуг;
                                        </li>
                                        <li>
                                            Таргетирование рекламных материалов;
                                        </li>
                                        <li>
                                            Проведение статистических и иных
                                            исследований, на основе обезличенных
                                            данных.
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            Условия обработки персональной информации
                            пользователя и её передачи третьим лицам
                            <ol className="list-counter space-y-1">
                                <li>
                                    Данный сайт хранит персональную информацию
                                    пользователей в соответствии с внутренними
                                    регламентами конкретных сервисов.
                                </li>
                                <li>
                                    В отношении персональной информации
                                    пользователя сохраняется ее
                                    конфиденциальность, кроме случаев
                                    добровольного предоставления пользователем
                                    информации о себе для общего доступа
                                    неограниченному кругу лиц.
                                </li>
                                <li>
                                    Данный сайт вправе передать персональную
                                    информацию пользователя третьим лицам в
                                    следующих случаях:
                                    <ol className="list-counter space-y-1">
                                        <li>
                                            Пользователь выразил свое согласие
                                            на такие действия;
                                        </li>
                                        <li>
                                            Передача необходима в рамках
                                            использования пользователем
                                            определенного Сервиса либо для
                                            оказания услуги пользователю;
                                        </li>
                                        <li>
                                            Передача предусмотрена российским
                                            или иным применимым
                                            законодательством в рамках
                                            установленной законодательством
                                            процедуры;
                                        </li>
                                        <li>
                                            Такая передача происходит в рамках
                                            продажи или иной передачи бизнеса
                                            (полностью или в части), при этом к
                                            приобретателю переходят все
                                            обязательства по соблюдению условий
                                            настоящей Политики применительно к
                                            полученной им персональной
                                            информации;
                                        </li>
                                        <li>
                                            В целях обеспечения возможности
                                            защиты прав и законных интересов
                                            данного сайта или третьих лиц в
                                            случаях, когда пользователь нарушает
                                            Пользовательское соглашение сервисов
                                            данного сайта;
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    При обработке персональных данных
                                    пользователей данный сайт руководствуется
                                    Федеральным законом РФ «О персональных
                                    данных»;
                                </li>
                                <li>
                                    Данный сайт осуществляет обработку
                                    персональных данных автоматизированным
                                    способом (с использованием средств
                                    автоматизации);
                                </li>
                            </ol>
                        </li>
                        <li>
                            Данный сайт руководствуется следующими принципами
                            обработки персональных данных:
                            <ol className="list-counter space-y-1">
                                <li>
                                    Обработка персональных данных осуществляется
                                    на законной и справедливой основе.
                                </li>
                                <li>
                                    Обработка персональных данных ограничивается
                                    достижением целей, указанных в данной
                                    Политике конфиденциальности.
                                </li>
                                <li>
                                    Данный сайт не допускает объединение баз
                                    данных, содержащих персональные данные,
                                    обработка которых осуществляется в целях,
                                    несовместимых между собой.
                                </li>
                                <li>
                                    Обработке подлежат только персональные
                                    данные, которые отвечают целям их обработки.
                                </li>
                                <li>
                                    Содержание и объем обрабатываемых
                                    персональных данных соответствуют заявленным
                                    целям обработки. Обрабатываемые персональные
                                    данные не являются избыточными по отношению
                                    к заявленным целям их обработки.
                                </li>
                                <li>
                                    При обработке персональных данных
                                    обеспечиваются точность персональных данных,
                                    их достаточность, а в необходимых случаях и
                                    актуальность по отношению к целям обработки
                                    персональных данных. Данный сайт принимает
                                    необходимые меры по удалению или уточнению
                                    неполных или неточных данных.
                                </li>
                                <li>
                                    Хранение персональных данных осуществляется
                                    в форме, позволяющей определить субъекта
                                    персональных данных, не дольше, чем этого
                                    требуют цели обработки персональных данных,
                                    если срок хранения персональных данных не
                                    установлен федеральным законом, договором,
                                    стороной которого, выгодоприобретателем или
                                    поручителем по которому является субъект
                                    персональных данных. Обрабатываемые
                                    персональные данные подлежат уничтожению
                                    либо обезличиванию по достижении целей
                                    обработки или в случае утраты необходимости
                                    в достижении этих целей, если иное не
                                    предусмотрено федеральным законом.
                                </li>
                            </ol>
                        </li>

                        <li>
                            Использования cookie-файлов
                            <ol className="list-counter space-y-1">
                                <li>
                                    Данный сайт использует cookie-файлы,
                                    веб-маяки и иные схожие технологии для того,
                                    чтобы отличить вас от других пользователей
                                    нашего ресурса. Это позволяет обеспечивать
                                    удобный просмотр нашего сайта, а также даёт
                                    возможность улучшать его.
                                </li>
                                <li>
                                    Что такое cookie-файлы? Cookie-файлы
                                    представляют собой небольшие фрагменты
                                    данных, которые сохраняются в браузере
                                    компьютера, мобильного телефона или другого
                                    устройства после посещения веб-сайтов.
                                    Cookie-файлы широко применяются для
                                    поддержания работы веб-сайтов и сбора
                                    статистики.
                                </li>
                                <li>
                                    Как мы используем cookie-файлы? Информация,
                                    которую мы собираем с помощью файлов
                                    cookie-файлов, помогает нам анализировать
                                    то, как используется наш веб-сайт, чтобы мы
                                    могли сделать его максимально удобным и
                                    функциональным.
                                </li>
                                <li>
                                    Персональные данные сохраняются в
                                    cookie-файлах, если вы согласились на их
                                    использование. Это обеспечивает защищенный
                                    вход в личный кабинет, что технически
                                    необходимо.
                                </li>
                                <li>
                                    Какие типы cookie-файлов мы используем?
                                    <ol className="list-counter space-y-1">
                                        <li>
                                            Технические cookie-файлы.
                                            Использование этих функциональных
                                            cookie-файлов нельзя запретить при
                                            посещении нашего сайта, так как они
                                            обеспечивают корректную работу
                                            веб-сайта. Сюда относятся
                                            cookie-файлы, которые собирают
                                            информацию о том, разрешено или
                                            запрещено использование других
                                            cookie-файлов с нашего сайта.
                                        </li>
                                        <li>
                                            Cookie-файлы сеанса посещения и
                                            cookie-файлы предпочтений. Данные
                                            cookie-файлы позволяют войти в
                                            защищенные разделы нашего сайта,
                                            добавлять товары в корзину. Срок
                                            действия таких cookie-файлов
                                            истекает по окончании сеанса
                                            посещения. Мы также можем
                                            использовать cookie-файлы, которые
                                            действуют дольше и создаются для
                                            того, чтобы запомнить ваши
                                            предпочтения и варианты выбора во
                                            время посещения нашего сайта.
                                        </li>
                                        <li>
                                            Аналитические файлы cookie. Мы
                                            используем средства веб-аналитики с
                                            целью общего анализа использования
                                            сайта и получения исходных данных
                                            для улучшения наших предложений.
                                            Полученная при этом информация может
                                            передаваться в анонимной форме на
                                            сервер службы веб-аналитики,
                                            сохраняться и обрабатываться там. Мы
                                            можем использовать аналитические
                                            инструменты и соответствующие
                                            cookie-файлы следующих поставщиков
                                            услуг: Google Analytics,
                                            Яндекс.Метрика,
                                        </li>
                                        <li>
                                            Веб-маяки. Веб-маяки – небольшие
                                            графические изображения (также
                                            называемые «пиксельными тегами» или
                                            «чистыми GIF»), которые могут
                                            размещаться на нашем веб-сайт.
                                            Веб-маяки могут использоваться для
                                            различных целей, включая оценку
                                            эффективности работы нашего
                                            веб-сайта, мониторинга количества
                                            посетителей и их поведения на нашем
                                            веб-сайте, определение доли реально
                                            прочитанных электронных писем от
                                            общего числа всех отправленных
                                            писем, контроль эффективности нашей
                                            рекламы и подсчёт количества
                                            фактически просмотренных страниц,
                                            статей и ссылок.
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Аналогичные технологии для хранения
                                    информации. Аналогичные технологии для
                                    хранения информации – технологии,
                                    позволяющие записывать определённую
                                    информацию в кэш-память веб-браузера или в
                                    память устройства с помощью локальных
                                    объектов общего пользования или локально
                                    сохраняемых данных, таких как cookie-файлы
                                    формата Flash и HTML 5 и прочие элементы
                                    прикладного программного обеспечения для
                                    интернета. Эти технологии могут применяться
                                    во всех используемых веб-браузерах. В
                                    некоторых случаях управление использованием
                                    локально сохраняемых данных с помощью
                                    веб-браузера в полном объёме невозможно и
                                    требует специальных инструментов. Подобные
                                    технологии хранения информации могут
                                    использоваться нами для защиты данных вашей
                                    учетной записи или для выявления
                                    нестандартных действий при использовании
                                    браузера в целях предотвращения
                                    несанкционированного доступа к вашей учетной
                                    записи или оценки эффективности
                                    функционирования нашего веб-сайта.
                                </li>
                                <li>
                                    Как можно разрешить или запретить
                                    использование cookie-файлов? Большинство
                                    браузеров автоматически принимают
                                    cookie-файлы. На вашем устройстве вы можете
                                    удалить сохраненные cookie-файлы в любое
                                    время. Как это делается более подробно, вы
                                    можете найти в инструкции по использованию
                                    вашего браузера или устройстве
                                    производителя. В настройках браузера также
                                    можно запретить любые cookie-файлы или
                                    только определенные. Однако все браузеры
                                    отличаются друг от друга, поэтому более
                                    подробная информация о настройках для
                                    cookie-файлов приведена в разделе Help
                                    («Справка») вашего браузера. Обращаем
                                    внимание что, отключив cookie-файлы, вы не
                                    сможете пользоваться некоторыми функциями,
                                    сервисами, инструментами нашего сайта.
                                </li>
                            </ol>
                        </li>

                        <li>
                            Изменение пользователем персональной информации
                            <ol className="list-counter space-y-1">
                                <li>
                                    Пользователь может в любой момент изменить
                                    (обновить, дополнить) предоставленную им
                                    персональную информацию или её часть, а
                                    также параметры её конфиденциальности,
                                    воспользовавшись функцией редактирования
                                    персональных данных в личном кабинете (в том
                                    случае, если на данном сайте предусмотрено
                                    наличие личного кабинета).
                                </li>
                            </ol>
                        </li>
                        <li>
                            Меры, применяемые для защиты персональной информации
                            пользователей
                            <ol className="list-counter space-y-1">
                                <li>
                                    Данный сайт принимает необходимые и
                                    достаточные организационные и технические
                                    меры для защиты персональной информации
                                    пользователя от неправомерного или
                                    случайного доступа, уничтожения, изменения,
                                    блокирования, копирования, распространения,
                                    а также от иных неправомерных действий с ней
                                    третьих лиц.
                                </li>
                            </ol>
                        </li>
                        <li>
                            Изменение Политики конфиденциальности. Применимое
                            законодательство
                            <ol className="list-counter space-y-1">
                                <li>
                                    Данный сайт имеет право вносить изменения в
                                    настоящую Политику конфиденциальности. При
                                    внесении изменений в актуальной редакции
                                    указывается дата последнего обновления.
                                    Новая редакция Политики вступает в силу с
                                    момента ее размещения, если иное не
                                    предусмотрено новой редакцией Политики.
                                    Действующая редакция всегда находится на
                                    странице по адресу https://inquadra.ru/
                                </li>
                                <li>
                                    К настоящей Политике и отношениям между
                                    пользователем и данным сайтом, возникающим в
                                    связи с применением Политики
                                    конфиденциальности, подлежит применению
                                    право Российской Федерации.
                                </li>
                            </ol>
                        </li>
                    </ol>
                </section>
            </main>
            <Footer />
        </>
    );
};
