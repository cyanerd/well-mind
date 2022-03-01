import Default from '../layouts/Default';
import React, {useEffect, useState} from 'react';
import api from '../Api';

const Offer: React.FC = () => {
  const [item, setItem] = useState<{ name: string, detail_text: string }>({name: '', detail_text: ''});
  const {response} = api.useAxios('get_content', {id: 1418});
  useEffect(() => {
    if (response?.item) setItem(response.item);
  }, [response]);

  return (
    <Default>
      <div className="inner-page">
        <div className="section text-page">
          <h2>{item.name}</h2>
          {item.detail_text && <div dangerouslySetInnerHTML={{__html: item.detail_text}}/>}

          {/*<h3>Термины и определения</h3>*/}
          {/*<p>Администрация Сервиса "Well-mind" – ИП Егоров Александр Андреевич ОГРНИП: 319774600117874 (далее - Администрация*/}
          {/*  Сервиса).</p>*/}

          {/*<p>Сервис "Well-mind" – интернет-ресурс, посвященный здоровому образу жизни, доступ к которому в сети "Интернет"*/}
          {/*  обеспечивается по адресу www.well-mind.ru. (далее - Сервис)</p>*/}

          {/*<p>Сайт Сервиса - www.well-mind.ru (далее - Сайт)</p>*/}

          {/*<p>Посетитель Сервиса - физическое лицо, достигшее 18-летнего возраста и обладающее необходимой дееспособностью для*/}
          {/*  заключения и исполнения настоящей Оферты, желающее ознакомиться с содержанием Сервиса, или намеренное подключить*/}
          {/*  доступ*/}
          {/*  к платным разделам Сервиса исключительно для личных, семейных, домашних или иных нужд, не связанных с осуществлением*/}
          {/*  предпринимательской деятельности (далее - Посетитель).</p>*/}

          {/*<p>Пользователь Сервиса – Посетитель, прошедший процедуру регистрации в Сервисе, имеющий доступ к платным разделам*/}
          {/*  Сервиса.</p>*/}

          {/*<p>Настоящая Оферта регулирует отношения между Администрацией Сервиса, Посетителем и Пользователем Сервиса.*/}
          {/*  Администрация*/}
          {/*  Сервиса, Посетитель и Пользователь в дальнейшем могут совместно именоваться «Стороны», а по отдельности -*/}
          {/*  «Сторона».</p>*/}

          {/*<p>Посещая Сайт, Посетитель подтверждает, что прочел, понял и согласен в полном объеме соблюдать условия настоящей*/}
          {/*  Оферты.*/}
          {/*  С момента подключения доступа к платным разделам Сервиса в соответствии с условиями настоящей Оферты Посетитель*/}
          {/*  становится Пользователем Сервиса.</p>*/}

          {/*<p>Соблюдение Оферты является обязательным для всех Пользователей и Посетителей Сайта с момента регистрации на Сайте в*/}
          {/*  установленном в Оферте порядке или с момента фактического начала пользования Сайта, в том числе посредством просмотра*/}
          {/*  страниц и материалов, добавления информации и т.д.</p>*/}

          {/*<p>В случае несогласия Посетителя/Пользователя с каким-либо из положений Оферты, Пользователь/Посетитель обязан*/}
          {/*  прекратить*/}
          {/*  использование Сайта.</p>*/}

          {/*<h3>1. Общие условия использования Сервиса</h3>*/}

          {/*<p>1.1. Администрация Сервиса предоставляет Посетителю и Пользователю услугу доступа к Сервису, представляющему собой*/}
          {/*  информационное пространство, позволяющее Посетителю и Пользователю получать доступ к материалам, содержащим результаты*/}
          {/*  интеллектуальной деятельности и приравненные к ним средства индивидуализации (в том числе: музыкальные произведения,*/}
          {/*  литературные произведения, программы для ЭВМ, мобильных телефонов, аудиовизуальные произведения, фонограммы,*/}
          {/*  изображения, фотографии, тексты, товарные знаки и знаки обслуживания, коммерческие обозначения и фирменные*/}
          {/*  наименования,*/}
          {/*  логотипы и др.), гипертекстовые ссылки, их фрагменты, информацию, виджеты и иные объекты, размещаемые на Сайте (далее*/}
          {/*  –*/}
          {/*  «Статьи»).</p>*/}

          {/*<p>1.2. Перечень функциональных возможностей, содержание и пользовательский интерфейс Сервиса определяется*/}
          {/*  Администрацией*/}
          {/*  Сервиса и может быть в любое время изменен путем размещения информационных материалов на Сайте. В случае, если*/}
          {/*  Посетитель/Пользователь продолжает использовать Сервис после изменения настоящей Оферты, это означает, что такие*/}
          {/*  изменения приняты Посетителем/Пользователем.</p>*/}

          {/*<p>1.3. Технические, организационные, коммерческие условия использования Сервиса, включая информацию о платных услугах,*/}
          {/*  доводятся до сведения Посетителей /Пользователей путем размещения информационных материалов на Сайте.</p>*/}

          {/*<p>1.4. Раздел "Консультации психологов" Сервиса.</p>*/}

          {/*<p>1.4.1. В рамках Сервиса Администрацией Сервиса создан специальный раздел "Консультации психологов", позволяющий, в*/}
          {/*  том*/}
          {/*  числе, Посетителям/Пользователям Сервиса, получать ответы на вопросы от лиц, обладающих специальными познаниями, а*/}
          {/*  также*/}
          {/*  необходимой квалификацией, навыком и опытом работы в области психологии (далее - Консультанты).</p>*/}

          {/*<p>1.4.2. Все ответы Консультанта не являются официальной медицинской консультацией специалиста (врача), носят*/}
          {/*  исключительно рекомендательный характер и нацелены на оказание помощи Посетителям/Пользователям Сервиса в получении*/}
          {/*  необходимой справочной информации. Ответы Консультантов не содержат информацию, которая может быть расценена, как*/}
          {/*  оказание Посетителям/Пользователям Сервиса медицинской помощи (медицинские услуги).</p>*/}

          {/*<p>1.4.3. Администрация Сервиса выступает посредником между Пользователем и Консультантом и не несет ответственности за*/}
          {/*  информацию/рекомендации предоставленные Консультантом Пользователю, а также за любые последствия ее применения*/}
          {/*  Пользователем.</p>*/}

          {/*<h3>2. Принимая условия настоящей Оферты, Посетитель/Пользователь соглашается, что:</h3>*/}

          {/*<p>2.1. Статьи, доступные Посетителю/Пользователю в рамках Сервиса, предназначены исключительно для личного, семейного,*/}
          {/*  домашнего и иного, не связанного с предпринимательской (коммерческой) деятельностью Посетителя/Пользователя*/}
          {/*  использования.</p>*/}

          {/*<p>2.2. Содержание Статей определяется Администрацией Сервиса. Статьи предоставляются для использования в информационных*/}
          {/*  целях на условиях «как есть» (as is), в связи с чем Посетителям/Пользователям не представляются какие-либо гарантии,*/}
          {/*  что*/}
          {/*  Статьи будут соответствовать всем требованиям и ожиданиям Посетителя/Пользователя.</p>*/}

          {/*<p>2.3. В процессе функционирования Сервиса допускаются сбои, ошибки, перерывы, вызванные техническими причинами.*/}
          {/*  Администрация Сервиса не несет ответственности за неисполнение либо ненадлежащее исполнение своих обязательств*/}
          {/*  вследствие сбоев в телекоммуникационных и энергетических сетях, действий вредоносных программ, а также*/}
          {/*  недобросовестных*/}
          {/*  действий третьих лиц, направленных на несанкционированный доступ и/или выведение из строя программного и/или*/}
          {/*  аппаратного*/}
          {/*  комплекса.</p>*/}

          {/*<p>2.4. Сервис предназначен для доступа посредством мобильных (сотовых) терминалов, а также персональных компьютеров*/}
          {/*  Посетителей/Пользователей с использованием протокола HTTP/HTTPS.</p>*/}

          {/*<p>2.5. Подключаясь к платным разделам Сервиса, Пользователь считается ознакомленным и согласившимся со стоимостью*/}
          {/*  использования платных разделов Сервиса.</p>*/}

          {/*<h3>3. Регистрация Пользователя</h3>*/}

          {/*<p>3.1. Для обеспечения полного доступа посетителя к Сервису и получения статуса Пользователя посетитель должен пройти*/}
          {/*  процедуру регистрации и создать свою Учетную запись путем передачи уникального идентификатора Пользователя и пароля,*/}
          {/*  используемых для доступа к личному кабинету Пользователя.</p>*/}

          {/*<p>При регистрации Пользователю присваивается почта вида: &lt;номер телефона Пользователя&rt;@bills.well-mind.ru доступ*/}
          {/*  к*/}
          {/*  которой предоставлен в личном кабинете Пользователя</p>*/}

          {/*<p>3.2. Пользователь несет персональную ответственность за сохранность и безопасность своего пароля. Администрация*/}
          {/*  Сервиса*/}
          {/*  не несет ответственности и не гарантирует безопасность Учетной записи и личного кабинета Пользователя в случаях:</p>*/}

          {/*<p>3.2.1. Передачи третьим лицам (умышленно или по неосторожности) пароля;</p>*/}

          {/*<p>3.2.2. Доступа третьих лиц к Учетной записи и личному кабинету Пользователя с использованием программных средств,*/}
          {/*  позволяющих осуществить подбор и/или раскодирование пароля;</p>*/}

          {/*<p>3.2.3. Невыполнения Пользователем рекомендаций, указанных в настоящей Оферте.</p>*/}

          {/*<p>3.3. Используя Сервис любым способом, в том числе, регистрируясь на Сайте, Посетитель/Пользователь подтверждает, что*/}
          {/*  обладает необходимой правоспособностью и дееспособностью для принятия условий настоящей Оферты, способен исполнять*/}
          {/*  условия Оферты и нести ответственность за их нарушение.</p>*/}

          {/*<p>3.4. Администрация Сайта имеет право в любое время удалить любые данные и Учетные записи по любой причине или без*/}
          {/*  причины. Администрация Сервиса оставляет за собой право отслеживать деятельность Пользователей на Сайте.</p>*/}

          {/*<h3>4. Запрещенные действия Пользователя:</h3>*/}

          {/*<p>4.1. Использовать Сайт любым способом, который может помешать нормальному функционированию Сервиса.</p>*/}

          {/*<p>4.2. Любым способом осуществлять подбор пароля, взлом либо другие действия, которые позволяют получить доступ к*/}
          {/*  Сервису*/}
          {/*  от имени другого Пользователя вопреки воле такого Пользователя.</p>*/}

          {/*<p>4.3 Использовать чужую Учетную запись для доступа к платным разделам Сервиса.</p>*/}

          {/*<p>4.4. Умышленно передавать данные своей Учетной записи третьим лицам с целью предоставления им доступа к Сервису и*/}
          {/*  использования одной Учетной записи для доступа к Сервису несколькими лицами.</p>*/}

          {/*<h3>5. Интеллектуальная собственность</h3>*/}

          {/*<p>5.1. Сервис представляет собой комплексный объект авторских прав и находится под управлением Администрации Сервиса.*/}
          {/*  Вся*/}
          {/*  информация, размещенная на Сервисе (включая статьи, тексты, фотоизображения, видеоматериалы, аудиозаписи, иллюстрации,*/}
          {/*  дизайн Сервиса, а также подбор, расположение и систематизация), является объектом интеллектуальной собственности и*/}
          {/*  охраняется в соответствии с законодательством РФ о защите интеллектуальной собственности.</p>*/}

          {/*<p>5.2. Администрация Сервиса является обладателем исключительных прав на указанную в п.5.1. информацию и представляет*/}
          {/*  интересы авторов материалов, размещенных на Сервисе.</p>*/}

          {/*<p>5.3. Любое использование, в том числе, но не ограничиваясь, копирование (в том числе запись на носители информации),*/}
          {/*  воспроизведение (включая воспроизведение на узлах сети Интернет для любых целей), переработка, распространение,*/}
          {/*  передача*/}
          {/*  в эфир, сообщение по кабелю для всеобщего сведения, доведение до всеобщего сведения через сеть Интернет, иное*/}
          {/*  использование статей и других материалов Сервиса любым способом без письменного разрешения Администрации Сервиса*/}
          {/*  запрещено и влечет ответственность, предусмотренную законодательством РФ о защите интеллектуальной собственности.</p>*/}

          {/*<h3>6. Сайты и материалы третьих лиц.</h3>*/}

          {/*<p>6.1. Сайт может содержать ссылки на другие сайты в сети Интернет.</p>*/}

          {/*<p>6.2. Сайт может содержать или направлять Пользователя/Посетителя по ссылкам на другие сайты, содержащие информацию,*/}
          {/*  при*/}
          {/*  этом Администрация Сервиса не несет ответственности за содержание таких сайтов, доступ к которым получен через Сервисы*/}
          {/*  сайта, за соблюдение исключительных прав третьих лиц, за законность размещенных на таких сайтах материалов.</p>*/}

          {/*<p>6.3. Если Посетитель/Пользователь решит покинуть Сайт и перейти к сайтам третьих лиц или использовать, или установить*/}
          {/*  программы третьих лиц, то делает это на свой риск, принимая все последствия, в том числе любой материальный и*/}
          {/*  моральный*/}
          {/*  вред, который может быть причинен Посетителю/Пользователю или третьим лицам в результате дальнейших действий*/}
          {/*  Пользователя.</p>*/}

          {/*<p>6.4. Администрация Сервиса не контролирует и не обязана принимать каких-либо действий, касающихся контроля:</p>*/}

          {/*<p>6.4.1. за способом, с помощью которого Посетители/Пользователи посещают Сайт или с помощью которого пользуются*/}
          {/*  Сервисом;</p>*/}

          {/*<p>6.4.2. за тем, какой эффект на Посетителей/Пользователей могут оказать размещенные на Сайте Статьи и каким образом*/}
          {/*  Посетители/Пользователи могут толковать размещенную на Сайте информацию;</p>*/}

          {/*<p>6.4.3. за действиями, предпринятыми Посетителями/Пользователями после ознакомления с размещенными на Сайте*/}
          {/*  Статьями.</p>*/}

          {/*<h3>7. Права Администрации Сервиса.</h3>*/}

          {/*<p>7.1. В случае нарушения Посетителем/Пользователем настоящей Оферты, Администрация Сервиса вправе приостанавливать,*/}
          {/*  ограничивать или прекращать доступ такого Посетителя/Пользователя ко всем или к любому разделу или сервису Сайта в*/}
          {/*  одностороннем безакцептном порядке в любое время без объяснения причин, с предварительным уведомлением или без*/}
          {/*  такового,*/}
          {/*  не отвечая за любой вред, который может быть причинен Посетителю/Пользователю таким действием (в том числе,*/}
          {/*  Администрация Cервиса имеет право удалить данные Пользователя с Сайта).</p>*/}

          {/*<p>7.2. Администрация Сервиса оставляет за собой право, в случае нарушения Пользователем настоящей Оферты, по запросу от*/}
          {/*  правоохранительных органов передать имеющиеся персональные данные Пользователя в рамках, установленных*/}
          {/*  законодательством*/}
          {/*  Российской Федерации.</p>*/}

          {/*<p>7.3. Администрация Сервиса имеет право прерывать работу Сервиса, если это обусловлено невозможностью использования*/}
          {/*  информационно-транспортных каналов, не являющихся собственными ресурсами Администрации Сервиса, либо действием и/или*/}
          {/*  бездействием третьих лиц, если это непосредственно влияет на работу Сервиса, в том числе при аварийной ситуации.</p>*/}

          {/*<h3>8. Гарантии и ответственность Сторон.</h3>*/}

          {/*<p>8.1. Посетитель/Пользователь несет личную ответственность за любую информацию, которую доводит до всеобщего сведения*/}
          {/*  (публикует) на Сайте или с его помощью.</p>*/}

          {/*<p>8.2. Информация, содержащаяся в Статьях, несет исключительно ознакомительный характер.</p>*/}

          {/*<p>8.3. Посетитель/Пользователь несет ответственность перед Администрацией Сервиса за соблюдение условий настоящей*/}
          {/*  Оферты.</p>*/}

          {/*<p>8.4. Посетитель/Пользователь соглашается с тем, что возместит Администрации Сервиса любые убытки, понесенные*/}
          {/*  Администрацией Сервиса в связи с ненадлежащим использованием Пользователем Сайта и/или нарушением Пользователем*/}
          {/*  настоящей Оферты и/или прав (в том числе авторских, патентных, информационных) третьих лиц.</p>*/}

          {/*<p>8.5. Администрация Сервиса не несет ответственности за ущерб и за причинение вреда здоровью, нанесенные*/}
          {/*  Посетителю/Пользователю вследствие применения информации, рекомендаций и программ, полученных в ходе использования*/}
          {/*  Сервиса, а также в случае, если Пользователь нарушил пункт 8.3. настоящей Оферты.</p>*/}

          {/*<p>8.7. Сервис предоставляется Посетителю/Пользователю «как есть» (as is) в соответствии с общепринятым в международной*/}
          {/*  практике принципом. Это означает, что за проблемы, возникающие в процессе обновления, поддержки и эксплуатации Сервиса*/}
          {/*  (в т. ч. проблемы совместимости с другими программными продуктами, а также несоответствия результатов использования*/}
          {/*  Сервиса ожиданиям Посетителя/Пользователя и т.п.), Администрация Сервиса ответственности не несет.</p>*/}

          {/*<p>8.9. Во всех остальных случаях Стороны несут ответственность в соответствии с законодательством РФ.</p>*/}

          {/*<h3>9. Условия предоставления доступа к Сервису Пользователю.</h3>*/}

          {/*<p>9.9. При регистрации в Сервисе и/или в ходе использования Сервиса, Посетитель/Пользователь выражает свое согласие на*/}
          {/*  обработку своих персональных данных принимая условия Соглашения об обработке персональных данных и Политики*/}
          {/*  конфиденциальности, действующей у Администрации Сервиса, расположенным по ссылке https://well-mind.ru/offer.pdf.</p>*/}

          {/*<p>9.10. Если по тем или иным причинам одна или несколько норм настоящей Оферты является недействительной или не имеющей*/}
          {/*  юридической силы, это не оказывает влияния на действительность или применимость остальных норм.</p>*/}

          {/*<p>9.11. Настоящая оферта регулируется и толкуется в соответствии с законодательством РФ. Вопросы, не урегулированные*/}
          {/*  Офертой, подлежат разрешению в соответствии с законодательством РФ.</p>*/}

          {/*<p>9.12. Пользователь и Посетитель Сайта соглашается, что в случае возникновения споров они подлежат разрешению в*/}
          {/*  судебном*/}
          {/*  порядке в соответствии с действующим законодательством РФ в уполномоченном органе судебной власти по месту нахождения*/}
          {/*  Администрации Сервиса.</p>*/}

        </div>
      </div>
    </Default>
  );
}

export default Offer;