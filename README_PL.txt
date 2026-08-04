NOWA HUTA // SEVEN TASKS — INSTRUKCJA

1. JAK DZIAŁA STRONA
- index.html to główna strona gry z 7 zadaniami i polami na kody.
- QR nie są wyświetlane przy zadaniach na stronie głównej.
- QR dla Photography, Crossword, Trail Hunt i Cards należy wydrukować osobno.
- Po zeskanowaniu QR telefon otwiera clue.html i wyświetla dodatkową informację dotyczącą danego zadania.

2. URUCHOMIENIE I PUBLIKACJA
- Rozpakuj folder.
- Do testów na komputerze możesz otworzyć index.html.
- Aby wydrukowane QR działały na telefonach, CAŁY folder musi być opublikowany pod publicznym adresem internetowym.
- Wgraj cały folder na hosting, zachowując nazwy i strukturę plików.

3. NAJWAŻNIEJSZE: USTAWIENIE ADRESU W QR
- W pliku qr_settings.json wpisz publiczny adres folderu, w którym znajduje się index.html i clue.html.
- Przykład: https://twojastrona.pl/nowa-huta/
- Następnie wygeneruj ponownie QR poleceniem:
  python generate_qr.py
- Możesz też od razu podać adres:
  python generate_qr.py --base-url "https://twojastrona.pl/nowa-huta/"
- Na Windows możesz przeciągnąć/skopiować adres do polecenia generate_qr.bat, np.:
  generate_qr.bat https://twojastrona.pl/nowa-huta/
- Nie drukuj obecnych kodów z napisem TWOJA-DOMENA.PL — są tylko wzorem do czasu podania finalnego adresu.

4. DRUKOWANIE QR
- Po ustawieniu adresu i ponownym wygenerowaniu QR otwórz qr-print.html.
- Pod każdym QR zobaczysz adres, do którego prowadzi.
- Wydrukuj kartki i umieść je przy odpowiednich zadaniach.

5. ZMIANA DODATKOWYCH INFORMACJI
- Otwórz clue-config.js.
- Zmień pole "text" przy odpowiednim zadaniu.
- Zmiana tekstu nie wymaga generowania nowego QR, ponieważ adres podstrony pozostaje taki sam.

6. ZMIANA KODÓW I OPISÓW ZADAŃ
- Otwórz game-config.js.
- Zmień pole "code" na właściwy kod końcowy.
- Możesz również zmienić "title", "subtitle" i "description".
- Sprawdzanie kodów nie rozróżnia wielkich i małych liter.

Domyślne kody testowe:
Photography: PHOTO57
Crossword: CROSS84
Trail Hunt: TRACK26
Bottle Cap Racing: CAPS19
Construction: BUILD43
The Kiosk: KIOSK72
Cards: CARDS31

7. POSTĘP GRY
- Rozwiązane zadania zapisują się automatycznie w pamięci przeglądarki.
- Odświeżenie strony nie kasuje postępu.
- Przycisk RESET PROGRESS usuwa zapis na danym urządzeniu.

8. UWAGA TECHNICZNA
- Poprawne kody są zapisane w game-config.js, więc osoba techniczna może je podejrzeć w kodzie strony. Do standardowej gry eventowej jest to zwykle wystarczające.
