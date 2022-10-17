import requests
import time

DOMAIN = 'http://127.0.0.1:8000'


def timeout():
    time.sleep(2)


def get_url(url):
    return f'{DOMAIN}{url}'


# timeout()

# не авторизован
response = requests.get(get_url('/users/'))
assert response.status_code == 401

# timeout()
# базовая авторизация
response = requests.get(get_url('/users'), auth=('root', 'root'))
assert response.status_code == 200

# timeout()
# авторизация по токену
TOKEN = requests.post(get_url('/api-token-auth/'), data={'username': 'root', 'password': 'root'}).json().get('token')
print(TOKEN)
headers = {'Authorisation': f'Token {TOKEN}'}
response = requests.get(get_url('/projects'), headers=headers)
assert response.status_code == 200

timeout()
# авторизация по jwt
# Получаем токен
response = requests.post(get_url('/api/token/'), data={'username': 'root', 'password': 'root'})
result = response.json()
# это наш токен
access = result['access']
print('первый токен', access, end=f'\n{150*"*"}\n')
refresh = result['refresh']
print('refresh токен', refresh, end=f'\n{150*"*"}\n')

timeout()
# Авторизуемся с ним
headers = {'Authorisation': f'Bearer {access}'}
response = requests.get(get_url('/users'), headers=headers)
assert response.status_code == 200

timeout()
# Рефрешим токен(Для обновления)
response = requests.get(get_url('/api/token/refresh/'), data={'refresh': refresh})
result = response.json()
# это наш токен
access = result['access']
print('Обновленный токен', access, end=f'\n{150*"*"}\n')
print('refresh токен', refresh, end=f'\n{150*"*"}\n')
timeout()
# Авторизуемся с новым токеном
headers = {'Authorisation': f'Bearer {access}'}
response = requests.get(get_url('/users'), headers=headers)
assert response.status_code == 200