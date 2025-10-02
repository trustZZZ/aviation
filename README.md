Для работы сервиса в качестве backend используется framework FastAPI для языка программирования python.

С помощью данного фреймворка просто реализовать заданные эндпоинты, масштабировать проект, подключить базу данных, postgresql, использовать кэширование с помощью redis и дополнить работу сервиса задачами на celery. Также в нашем проекте реализована администрирование с помощью сервиса keycloak с технологией OIDC, который полностью интегрирован в наш сервис.

На языке python реализован простой алгоритм. который может парсить данные из таблицы в excel с заданными параметрами, а наш сервис сохраняет эти данные в базу данных на Postgresql.

В качестве фреймворка для сервиса был использован react


Для развертывания проекта на локальной машине необходимо:
установить Docker
запустить консоль и вставить:
  * docker run -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.3.4 start-dev
Эта команда запустит сервис keycloak для дальнейшей работы
Для настройки окружения необходио создать администратора, установить пароль и добавить разрешения для администратора. После этого можно будет удалить временную запись.

<img width="1480" height="704" alt="image" src="https://github.com/user-attachments/assets/75476092-2ebf-4960-b3df-83352c1eff48" />

Настроить realms:
  * Realm name - FastAPI Connection
Создать client:
  * id - fastapi-client
  * установить поля
Скопировать в файл .env проекта из поля credentials ClientSecret

<img width="1536" height="800" alt="image" src="https://github.com/user-attachments/assets/bc33e385-6cf5-46ec-a141-4dcc376038bb" />


Также необходимо установить Node.js для работы фронтэнда (https://nodejs.org/en/download/) через докер
После установки прописать команду:
  * перейти в каталог, где находится проект, в папку /app/ui
  * npm run dev - запуститься локальный сервер

Для работы c базой данных необходимо установить postgresql (PgAdmin) и настроить соединение

<img width="696" height="541" alt="image" src="https://github.com/user-attachments/assets/67301b5a-382b-4696-bd48-daff6cb6838f" />


Для запуска проекта необходимо установить python 3.13, среду разработки (например, VSCode для удобства работы)
 * установить необходимые зависимости с помощью команды:
    - pip install -r requirements.txt
  
      <img width="1866" height="227" alt="image" src="https://github.com/user-attachments/assets/2d8206fd-d9b1-461f-a3bf-f49af8f7a5b9" />
 * после установки всех зависимостей настроить окружение (.env):
    <img width="1917" height="1024" alt="image" src="https://github.com/user-attachments/assets/38928a62-fdfe-4302-974e-e52dd8a43305" />
 * выполнить миграции в базу данных:
   - alembic upgrade head
   <img width="1920" height="892" alt="image" src="https://github.com/user-attachments/assets/7fd5cd27-5c2a-4952-98a5-a2e02689a442" />

 * запустить сервер для backend:
   - uvicorn app.main:app --reload --port 8000
     <img width="1920" height="908" alt="image" src="https://github.com/user-attachments/assets/5c939d5e-f92e-4020-be18-a1d26be093e3" />

 * перейти в браузер по ссылке http://localhost:8000
 * 
<img width="1920" height="864" alt="image" src="https://github.com/user-attachments/assets/170dd659-8e97-4986-9be3-b4a77876f245" />

После этого вам будет предложено ввести учетные данные пользователя, которого Вы настраивале ранне в keycloak. После успешной авторизации Вас перенаправит на страницу с сервиом

<img width="1920" height="836" alt="image" src="https://github.com/user-attachments/assets/1de9beef-e132-42e0-b2fc-c22dc3116ab0" />

Данный фронт носит только демонстративный характер и является макетом будущего проекта.
Однако эндпоинты реализованы на бэкенде, которые можно будет подключить к фронту посредствам обращения по API-запросам
* http://localhost:8000/docs - отобразит все ендпоинты


