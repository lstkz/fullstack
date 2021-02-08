import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { Heading } from 'src/components/Heading';
import { HeadTitle } from 'src/components/HeadTitle';

function Ol(props: React.HTMLAttributes<HTMLOListElement>) {
  return <ol {...props} className="mt-1 pl-10 list-decimal" />;
}

function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className="mt-2" />;
}

function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 {...props} className="text-heading text-xl mb-1 mt-4 font-semibold" />
  );
}

function ContactEmail() {
  return <a href="mailto:kontakt@fullstack.pl">kontakt@fullstack.pl</a>;
}

export function PrivacyPage() {
  return (
    <Dashboard>
      <HeadTitle title="Polityka prywatności" />
      <div className="container">
        <div className="py-12">
          <Heading type={2} className="text-center mb-10">
            Polityka prywatności
          </Heading>
          <H3>Dane osobowe</H3>
          <P>
            Administratorem Twoich danych osobowych jest Łukasz Sentkiewicz
            prowadzący działalność gospodarczą pod firmą „TOPKODER - Łukasz
            Sentkiewicz” z siedzibą w Gdyni (81-586) przy ul. Strzelców 50 lok.
            30, NIP 5862243134, REGON 361308132.
          </P>
          <P>
            Cele, podstawy prawne oraz okres przetwarzania danych osobowych
            wskazane są odrębnie w stosunku do każdego celu przetwarzania
            danych. Uprawnienia RODO przyznaje następujące uprawnienia związane
            z przetwarzaniem Twoich danych osobowych:
          </P>
          <Ol>
            <li>prawo dostępu do swoich danych oraz otrzymania ich kopii,</li>
            <li>prawo do sprostowania swoich danych,</li>
            <li>prawo do usunięcia danych, </li>
            <li>prawo do usunięcia danych, </li>
            <li>prawo do ograniczenia przetwarzania,</li>
            <li>prawo do wniesienia sprzeciwu wobec przetwarzania danych,</li>
            <li>prawo do przenoszenia danych,</li>
            <li>prawo wniesienia skargi do organu nadzorczego</li>
          </Ol>
          <P>
            Zasady związane z realizacją wskazanych powyżej uprawnień zostały
            opisane szczegółowo w art. 16 – 21 RODO.
          </P>
          <P>
            Możesz również zwrócić się do nas z żądaniem udostępnienia Ci
            informacji o tym, jakie dane na Twój temat posiadamy oraz w jakich
            celach je przetwarzamy. Wystarczy, że wyślesz wiadomość na adres{' '}
            <ContactEmail />
          </P>
          <H3>Bezpieczeństwo</H3>
          <P>
            Zapewniamy poufność wszelkich przekazanych nam danych osobowych.
            Zapewniamy podjęcie odpowiednich środków bezpieczeństwa i ochrony
            danych osobowych wymaganych przez przepisy o ochronie danych
            osobowych. Dane osobowe są gromadzone z należytą starannością i
            odpowiednio chronione przed dostępem do nich przez osoby do tego
            nieupoważnione.
          </P>
          <H3>Odbiorcy danych</H3>
          <P>
            Twoje dane osobowe mogą być przetwarzane przez podmioty, z których
            usług korzystamy, a których usługi wiążą się lub mogą wiązać się z
            przetwarzaniem danych osobowych. Chodzi o, w szczególności,
            następujące podmioty: hostingodawca, dostawca usługi poczty
            elektronicznej, dostawca systemu do fakturowania, biuro rachunkowe,
            kancelaria prawna, podmiot świadczący usługi w zakresie obsługi
            technicznej strony internetowej, firmy kurierskie, pozostali
            podwykonawcy.
          </P>
          <P>
            Twoje dane osobowe mogą być również przekazywane do urzędów
            skarbowych w zakresie niezbędnym do realizacji obowiązków
            podatkowo-rozliczeniowo-księgowych.
          </P>
          <P>
            Ponadto, w razie zaistnienia takiej konieczności, Twoje dane osobowe
            mogą być udostępniane podmiotom, organom lub instytucjom uprawnionym
            do uzyskania dostępu do danych na podstawie przepisów prawa, takim
            jak służby policyjne, bezpieczeństwa, sądy, prokuratury.
          </P>
          <H3>Cele i czynności przetwarzania danych osobowych</H3>
          <H3>Zamówienia</H3>
          <P>
            Składając Zamówienie, musisz podać dane niezbędne do realizacji
            zamówienia, takie jak imię i nazwisko, adres rozliczeniowy, adres
            e-mail, numer telefonu, nazwa firmy, numer NIP. Podanie danych jest
            dobrowolne, ale niezbędne do złożenia zamówienia.
          </P>
          <P>
            Dane przekazane nam w związku z zamówieniem, przetwarzane są w celu
            wykonania umowy zawieranej poprzez złożenie zamówienia (art. 6 ust.
            1 lit. b RODO), wystawienia faktury (art. 6 ust. 1 lit. c RODO),
            uwzględnienia faktury w dokumentacji księgowej (art. 6 ust. 1 lit. c
            RODO) oraz w celach archiwalnych i statystycznych (art. 6 ust. 1
            lit. f RODO).
          </P>
          <P>
            Po upływie tego terminu, dane nadal mogą być przez nas przetwarzane
            w celach archiwalnych statystycznych, w szczególności w celu
            identyfikacji klienta powracającego.
          </P>
          <P>
            Mamy obowiązek przechowywać faktury z Twoimi danymi osobowymi przez
            okres 5 lat od końca roku podatkowego, w którym powstał obowiązek
            podatkowy.
          </P>
          <P>
            Dane o zamówieniach będą przetwarzane przez czas niezbędny do
            realizacji zamówienia, a następnie do czasu upływu terminu
            przedawnienia roszczeń z tytułu zawartej umowy.
          </P>
          <P>
            W przypadku danych o zamówieniach nie masz możliwości sprostowania
            tych danych po realizacji zamówienia. Nie możesz również sprzeciwić
            się przetwarzaniu danych oraz domagać się usunięcia danych do czasu
            upływu terminu przedawnienia roszczeń z tytułu zawartej umowy.
            Podobnie, nie możesz sprzeciwić się przetwarzaniu danych oraz
            domagać się usunięcia danych zawartych w fakturach. Po upływie
            terminu przedawnienia roszczeń z tytułu zawartej umowy możesz
            jedynie sprzeciwić się przetwarzaniu przez nas Twoich danych w
            celach statystycznych, jak również domagać się usunięcia Twoich
            danych z bazy.
          </P>
          <P>
            Reklamacje, rezygnacje i odstąpienie od umowy. Jeżeli składasz
            reklamację, rezygnację lub odstępujesz od umowy, to przekazujesz
            dane osobowe zawarte w treści reklamacji, rezygnacji lub
            oświadczeniu o odstąpieniu od umowy, które obejmuję imię i nazwisko,
            adres zamieszkania, numer telefonu, adres e-mail, numer rachunku
            bankowego. Podanie danych jest dobrowolne, ale niezbędne, by złożyć
            reklamację lub odstąpić od umowy.
          </P>
          <P>
            Dane przekazane w związku ze złożeniem reklamacji lub odstąpieniem
            od umowy wykorzystywane są w celu realizacji procedury reklamacyjnej
            lub procedury odstąpienia od umowy (art. 6 ust. 1 lit. c RODO), a
            następnie w celach archiwalnych, co stanowi nasz prawnie uzasadniony
            interes (art. 6 ust. 1 lit. f RODO).
          </P>
          <P>
            Dane będą przetwarzane przez czas niezbędny do realizacji procedury
            reklamacyjnej lub procedury odstąpienia. Reklamacje oraz
            oświadczenia o odstąpieniu od umowy mogą być ponadto archiwizowane w
            celu możliwości wykazania w przyszłości przebiegu procesu
            reklamacyjnego lub odstąpienia od umowy.
          </P>
          <P>
            W przypadku danych zawartych w reklamacjach oraz oświadczeniach o
            odstąpieniu od umowy nie masz możliwości sprostowania tych danych.
            Nie możesz również sprzeciwić się przetwarzaniu danych oraz domagać
            się usunięcia danych do czasu upływu terminu przedawnienia roszczeń
            z tytułu zawartej umowy. Po upływie terminu przedawnienia roszczeń z
            tytułu zawartej umowy możesz jednak sprzeciwić się przetwarzaniu
            przez nas Twoich danych, jak również domagać się usunięcia Twoich
            danych z bazy.
          </P>
          <H3>Kontakt</H3>
          Kontaktując się z nami, w sposób naturalny przekazujesz nam swoje dane
          osobowe zawarte w treści korespondencji, w szczególności adres e-mail
          oraz imię. Podanie danych jest dobrowolne, ale niezbędne, by nawiązać
          kontakt.
          <P></P>
          Twoje dane są w tym przypadku przetwarzane w celu kontaktu z Tobą, a
          podstawą przetwarzania jest art. 6 ust. 1 lit. f RODO, czyli nasz
          uzasadniony interes. Podstawą prawną przetwarzania po zakończeniu
          kontaktu jest również nasz usprawiedliwiony cel w postaci archiwizacji
          korespondencji na potrzeby wewnętrzne (art. 6 ust. 1 lit. f RODO).
          <P>
            Treść korespondencji może podlegać archiwizacji. Masz prawo do
            domagania się przedstawienia historii korespondencji, jaką z nami
            prowadziłeś (jeżeli podlegała archiwizacji), jak również domagać się
            jej usunięcia, chyba że jej archiwizacja jest uzasadniona z uwagi na
            nasze nadrzędne interesy, np. obrona przed potencjalnymi
            roszczeniami z Twojej strony.
          </P>
          <P>
            Marketing własnych produktów i usług. Korzystając z naszych usług
            oraz składając zamówienie, przekazujesz nam swoje dane osobowe,
            takie jak imię i nazwisko, adres rozliczeniowy, adres e-mail, numer
            telefonu, nazwa firmy, numer NIP. Podanie danych jest dobrowolne,
            ale niezbędne do złożenia zamówienia lub skorzystania z naszych
            usług.
          </P>
          <P>
            Twoje dane są w tym przypadku przetwarzane w celu marketingu naszych
            usług i produktów, a podstawą przetwarzania jest art. 6 ust. 1 lit.
            f RODO, czyli nasz uzasadniony interes. Ponadto Twoje dane będą
            przechowywane w naszej bazie w celu ewentualnej obrony, ustalenia
            lub dochodzenia roszczeń związanych z zawartą pomiędzy nami umową,
            jak również w celu identyfikacji klienta powracającego, co stanowi
            nasz uzasadniony interes, o którym mowa w art. 6 ust. 1 lit. f RODO.
          </P>
          <P>
            Dane będą przechowywane przez czas prowadzenia przeze mnie
            działalności gospodarczej, chyba że wcześniej sprzeciwisz się
            przetwarzaniu Twoich danych osobowych, a ja nie będę miała
            nadrzędnego interesu w dalszym przetwarzaniu danych objętym
            sprzeciwem. W każdej chwili możesz sprzeciwić się przetwarzaniu
            Twoich danych w celu marketingu własnych produktów lub usług, co
            sprawi, że zaprzestanę wysyłki do Ciebie przesyłek reklamowych.
          </P>
          <P>
            Jeżeli upłynął już termin przedawnienia roszczeń z tytułu łączącej
            nas umowy, możesz również sprzeciwić się przetwarzaniu Twoich danych
            w ogóle, co doprowadzi do ich trwałego usunięcia z bazy.
          </P>
          <H3>Newsletter</H3>
          <P>
            Zapisując się na newsletter, przekazujesz nam swój adres e-mail.
            Podanie adresu e-mail jest dobrowolne, ale niezbędne, by zapisać się
            na newsletter. Podstawą prawną ich przetwarzania jest Twoja zgoda
            (art. 6 ust. 1 lit. a RODO) wyrażona podczas zapisywania się na
            newsletter.
          </P>
          <P>
            W każdej chwili możesz zrezygnować z otrzymywania newslettera,
            klikając w dedykowany link znajdujący się w każdej wiadomości
            wysyłanej w ramach newslettera lub po prostu kontaktując się z nami.
            Pomimo rezygnacji z newslettera, Twoje dane będą nadal przechowywane
            w naszej bazie w celu ewentualnej obrony roszczeń związanych z
            wysyłaniem Ci newslettera, w szczególności na potrzeby wykazania
            faktu udzielenia przez Ciebie zgody na otrzymywanie newslettera oraz
            chwili jej wycofania, co stanowi nasz prawnie uzasadniony interes, o
            którym mowa w art. 6 ust. 1 lit. f RODO.
          </P>
          <P>
            W każdej chwili możesz sprostować swoje dane zapisane w bazie
            newsletterowej. W sytuacji, w której złożysz sprzeciw wobec
            przetwarzania Twoich danych osobowych, domagając się jednocześnie
            usunięcia swoich danych z naszej bazy, będziemy zmuszeni
            poinformować Cię, że z uwagi na nasz uzasadniony interes, o którym
            mowa w akapicie poprzedzającym, nie usuniemy Twoich danych z bazy.
            Usunięcie takich danych uniemożliwiłoby nam wykazania w razie
            potrzeby faktu udzielenia przez Ciebie w przeszłości zgody na
            otrzymywanie newslettera.
          </P>
          <P>
            Wykorzystywany przez nas system mailingowy śledzi Twoje działania
            podejmowane w związku z wysyłanymi do Ciebie wiadomościami. W
            związku z tym, posiadamy informacje, które wiadomości otworzyłeś, w
            ramach których wiadomości kliknąłeś w linki itp.
          </P>
          <H3>Pliki cookies i inne technologie śledzące</H3>
          Serwis wykorzystuje pliki cookies.
          <P></P>
          Cookies to niewielkie informacje tekstowe, przechowywane na Twoim
          urządzeniu końcowym (np. komputerze, tablecie, smartfonie), które mogą
          być odczytywane przez nasz system teleinformatyczny (cookies własne)
          lub system teleinformatyczny podmiotów trzecich (cookies podmiotów
          trzecich).
          <P>
            Niektóre używane przez nas cookies są usuwane po zakończeniu sesji
            przeglądarki internetowej, tzn. po jej zamknięciu (tzw. cookies
            sesyjne). Inne cookies są zachowywane na Twoim urządzeniu końcowym i
            umożliwiają nam rozpoznanie Twojej przeglądarki przy kolejnym
            wejściu na stronę (trwałe cookies).
          </P>
          <P>
            Poniżej znajdziesz szczegółowe informacje na temat plików cookies
            funkcjonujących w ramach naszej strony.
          </P>
          <P>
            Zgoda na cookies. Podczas pierwszej wizyty na stronie wyświetlana
            jest Ci informacja na temat stosowania plików cookies wraz z
            pytaniem o zgodę na wykorzystywanie tych plików.
          </P>
          <P>
            Dzięki specjalnemu narzędziu masz możliwość zarządzania plikami
            cookies z poziomu strony, wyłączając poszczególne pliki cookies.
          </P>
          <P>
            Ponadto, zawsze możesz zmienić ustawienia cookies z poziomu swojej
            przeglądarki albo w ogóle usunąć pliki cookies. Przeglądarki
            zarządzają ustawieniami cookies na różne sposoby. W menu pomocniczym
            przeglądarki internetowej znajdziesz wyjaśnienia dotyczące zmiany
            ustawień cookies.
          </P>
          <P>
            Pamiętaj, że wyłączenie lub ograniczenie obsługi plików cookies może
            powodować trudności w korzystaniu z naszej strony.
          </P>
          <H3>Cookies własne</H3>
          <P>
            Cookies własne wykorzystujemy w celu zapewnienia prawidłowego
            funkcjonowania strony. W plikach cookies własnych przechowywana jest
            również informacja o wyrażeniu przez Ciebie zgody na korzystanie z
            plików cookies oraz informacje o zdefiniowanych przez Ciebie w
            ramach naszej strony ustawieniach plików cookies. Pliki cookies
            własne wykorzystywane są również przez skrypt odpowiadający za
            mechanizm odzyskiwania porzuconych koszyków. Oznacza to, że w
            plikach cookies mogą znajdować się informacje na temat zawartości
            Twojego koszyka, ostatnio oglądanych produktach itp.
          </P>
          <H3>Cookies podmiotów trzecich</H3>
          <P>
            Nasza strona, wykorzystuje funkcje zapewniane przez podmioty
            trzecie, co wiąże się z wykorzystywaniem plików cookies pochodzących
            od podmiotów trzecich. Wykorzystanie tego rodzaju plików cookies
            zostało opisane poniżej.
          </P>
          <H3>Google Analytics</H3>
          <P>
            Korzystamy z narzędzia Google Analytics zapewnianego przez Google
            LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
            Działania w tym zakresie realizujemy, opierając się na naszym
            prawnie uzasadnionym interesie, polegającym na tworzeniu statystyk i
            ich analizie w celu optymalizacji naszych stron internetowych.
            Google Analytics w sposób automatyczny gromadzi informacje o Twoim
            korzystaniu z naszej strony. Zgromadzone w ten sposób informacje są
            najczęściej przekazywane do serwera Google w Stanach Zjednoczonych i
            tam przechowywane.
          </P>
          <P>
            Z uwagi na aktywowaną przez nas anonimizację adresu IP, Twój adres
            IP jest skracany przed przekazaniem dalej. Tylko w wyjątkowych
            przypadkach pełny adres IP jest przekazywany do serwera Google w
            Stanach Zjednoczonych i dopiero tam skracany. Zanonimizowany adres
            IP przekazany przez Twoją przeglądarkę w ramach Google Analytics co
            do zasady nie jest łączony z innymi danymi Google.
          </P>
          <P>
            Podkreślamy, że w ramach Google Analytics nie gromadzimy
            jakichkolwiek danych, które pozwalałaby na Twoją identyfikację. W
            związku z tym, dane gromadzone w ramach Google Analytics nie mają
            charakteru danych osobowych. Informacje, do jakich mamy dostęp w
            ramach Google Analytics to, w szczególności: informacje o systemie
            operacyjnym i przeglądarce internetowej, z której korzystasz,
            podstrony, jakie przeglądasz w ramach naszego serwisu, czas spędzony
            w naszym serwisie oraz na jego podstronach, przejścia pomiędzy
            poszczególnymi podstronami w ramach naszego serwisu, źródło, z
            którego przechodzisz do naszego serwisu.
          </P>
          <P>
            Ponadto, korzystamy w ramach Google Analytics z następujących
            Funkcji Reklamowych: raporty demograficzne i zainteresowań,
            remarketing, funkcje raportowania o reklamach, user-ID.
          </P>
          <P>
            W ramach Funkcji Reklamowych również nie gromadzimy danych
            osobowych. Informacje, do jakich mamy dostęp, to, w szczególności:
            przedział wieku, w którym się znajdujesz, Twoja płeć, Twoja
            przybliżona lokalizacja ograniczona do miejscowości, Twoje
            zainteresowania określone na podstawie aktywności w sieci.
          </P>
          <P>
            W celu korzystania z Google Analytics, zaimplementowaliśmy w kodzie
            naszej strony specjalny kod śledzący Google Analytics. Kod śledzący
            wykorzystuje pliki cookies firmy Google LLC dotyczące usługi Google
            Analytics. Z poziomu naszej strony, z wykorzystaniem mechanizmu
            służącego do zarządzania plikami cookies, możesz wyłączyć kod
            śledzący Google Analytics. W każdej chwili możesz również zablokować
            kod śledzący Google Analytics, instalując dodatek do przeglądarki
            udostępniany przez Google: https://tools.google.com/dlpage/gaoptout.
          </P>
          <P>
            Usługi Google Analytics i Google Analytics 360 uzyskały certyfikat
            niezależnego standardu bezpieczeństwa ISO 27001. ISO 27001 jest
            jednym z najczęściej uznawanych standardów na świecie i poświadcza
            spełnianie odpowiednich wymogów przez systemy obsługujące Google
            Analytics i Google Analytics 360.
          </P>
          <P>
            Treści z serwisów zewnętrznych. Osadzamy na stronach treści z
            serwisów zewnętrznych, w szczególności filmy z serwisu YouTube oraz
            Vimeo. W związku z tym, wykorzystywane są pliki cookies firmy Google
            LLC związane z usługą YouTube, w tym pliki cookies DoubleClick oraz
            pliki cookies firmy Vimeo Inc.
          </P>
          <P>
            Odtwarzając wideo lub zapoznając się z innym osadzonym materiałem,
            Google lub Vimeo otrzymują o tym informacje, nawet jeśli nie
            posiadasz profilu u danego usługodawcy czy nie jesteś akurat
            zalogowany. Taka informacja (wraz z Twoim adresem IP) jest przez
            Twoją przeglądarkę przesyłana bezpośrednio do serwera danego
            usługodawcy (niektóre serwery znajdują się w USA) i tam
            przechowywana.
          </P>
          <P>
            Jeśli zalogowałeś się do serwisu danego usługodawcy, to usługodawca
            ten będzie mógł bezpośrednio przyporządkować wizytę na naszej
            stronie do Twojego profilu w danym serwisie społecznościowym. Cel i
            zakres gromadzenia danych oraz ich dalszego przetwarzania i
            wykorzystania przez usługodawców, jak również możliwość kontaktu
            oraz Twoje prawa w tym zakresie i możliwość dokonania ustawień
            zapewniających ochronę Twojej prywatności zostały opisane w polityce
            prywatności poszczególnych usługodawców.
          </P>
          <P>
            Jeśli nie chcesz, aby usługodawcy przyporządkowywali dane zebrane w
            trakcie odtwarzania wideo lub zapoznawania się z innymi treściami na
            naszej stronie internetowej bezpośrednio Twojemu profilowi w danym
            serwisie, to przed wizytą na naszej stronie musisz się wylogować z
            tego serwisu. Możesz również całkowicie uniemożliwić załadowanie na
            stronie wtyczek stosując odpowiednie rozszerzenia dla Twojej
            przeglądarki, np. blokowanie skryptów.
          </P>
          <P>
            Pliki cookies związane z YouTube ładowane są dopiero w chwili
            odtworzenia filmu, więc jeżeli nie chcesz, by do tego doszło,
            powstrzymaj się od oglądania filmu.
          </P>
          <H3>Narzędzia społecznościowe</H3>
          <P>
            Na naszej stronie internetowej używane są wtyczki i inne narzędzia
            społecznościowe udostępniane przez serwisy społecznościowe, takie
            jak Facebook.
          </P>
          <P>
            Wyświetlając naszą stronę internetową, zawierającą taką wtyczkę,
            Twoja przeglądarka nawiąże bezpośrednie połączenie z serwerami
            administratorów serwisów społecznościowych (usługodawców). Zawartość
            wtyczki jest przekazywana przez danego usługodawcę bezpośrednio do
            Twojej przeglądarki i integrowana ze stroną. Dzięki tej integracji
            usługodawcy otrzymują informację, że Twoja przeglądarka wyświetliła
            naszą stronę, nawet jeśli nie posiadasz profilu u danego usługodawcy
            czy nie jesteś u niego akurat zalogowany. Taka informacja (wraz z
            Twoim adresem IP) jest przez Twoją przeglądarkę przesyłana
            bezpośrednio do serwera danego usługodawcy (niektóre serwery
            znajdują się w USA) i tam przechowywana.
          </P>
          <P>
            Jeśli użyjesz danej wtyczki, np. kilkając w przycisk „Lubię to” lub
            „Udostępnij”, to odpowiednia informacja zostanie również przesłana
            bezpośrednio na serwer danego usługodawcy i tam zachowana.
          </P>
          <P>
            Ponadto, informacje te zostaną opublikowane w serwisie
            społecznościowym i ukażą się osobom dodanym jako Twoje kontakty. Cel
            i zakres gromadzenia danych oraz ich dalszego przetwarzania i
            wykorzystania przez usługodawców, jak również możliwość kontaktu
            oraz Twoje prawa w tym zakresie i możliwość dokonania ustawień
            zapewniających ochronę Twojej prywatności zostały opisane w polityce
            prywatności Facebook –
            https://www.facebook.com/legal/FB_Work_Privacy,
          </P>
          <H3>Logi serwera</H3>
          <P>
            Korzystanie ze strony wiąże się z przesyłaniem zapytań do serwera,
            na którym przechowywana jest strona. Każde zapytanie skierowane do
            serwera zapisywane jest w logach serwera.
          </P>
          <P>
            Logi obejmują w szczególności adres IP, datę i czas serwera,
            informacje o przeglądarce internetowej i systemie operacyjnym, z
            jakiego korzystasz. Logi zapisywane i przechowywane są na serwerze.
          </P>
          <P>
            Dane zapisane w logach serwera nie są kojarzone z konkretnymi
            osobami korzystającymi ze strony i nie są wykorzystywane przez nas w
            celu Twojej identyfikacji.
          </P>
          <P>
            Logi serwera stanowią wyłącznie materiał pomocniczy służący do
            administrowania stroną, a ich zawartość nie jest ujawniana nikomu
            poza osobami upoważnionymi do administrowania serwerem.
          </P>
          <P>
            1 Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z
            dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku
            z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu
            takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
            rozporządzenie o ochronie danych) (Dz. U. UE. L. z 2016 r. Nr 119,
            str. 1 z późn. zm.). Zmiany w Polityce prywatności Niniejsza
            Polityka prywatności może być okresowo zmieniana. Najnowsza wersja
            przedmiotowego dokumentu jest publikowana w Serwisie. Przyczyną
            zmian dokumentu mogą być rozwój technologii internetowej, zmiany w
            powszechnie obowiązującym prawie, czy rozwój Serwisu. Wszelkie
            zmiany wprowadzane przez Administratora do Polityki prywatności w
            przyszłości będą publikowane i będą obowiązywać wyłącznie na
            przyszłość. Administrator zaleca każdorazowo przeglądanie polityki
            prywatności przed podjęciem jakichkolwiek działań w Serwisie. Data
            ostatniej aktualizacji: 08.02.2021 r.
          </P>
          <H3>Data ostatniej aktualizacji: 08.02.2021 r.</H3>
        </div>
      </div>
    </Dashboard>
  );
}
