#Minha Coleção: Séries

#Projeto avaliativo M2 pt1 (ADS · Desenvolvimento Web Fullstack)

#Integrantes:
- Felipe Donizete Dias - 11261105397
- João Victor Marcelino da Silva - 11261505708
- Matheus Novais de Oliveira - 11261105219
- Pedro Stolemberger Silva - 11261105057

#Variante
-Séries - app 'series' - modelo 'Serie' - campos (titulo, plataforma, ano, avaliacao)

#Como rodar o backend (Django):
'''
pip install django django-cors-headers
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
'''
- http://127.0.0.1:8000/
- http://127.0.0.1:8000/admin
- http://127.0.0.1:8000/admin/series


#Como rodar o frontend (React):
'''
cd frontend
npm install
npm run dev
'''
- Abra http://localhost:5173

#Endereços da API:
- GET e POST: /api/series/
- GET: /api/series/resumo/
