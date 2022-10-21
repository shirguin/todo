import json
import math

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User

from user.views import UserModelViewSet

from .models import Project, ToDo
from .views import ProjectModelViewSet
from django.contrib.auth import get_user_model
User = get_user_model()


class TestUserModelViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = '12345'
        self.email = 'admin@yandex.ru'
        self.url = '/users/'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)
        self.data_user = {'password': '12345', 'username': 'Alex', 'first_name': 'Алексей', 'last_name': 'Ширгин', 'email': 'alex@mail.ru'}
        self.data_user_put = {'password': '12345', 'username': 'Petr', 'first_name': 'Петр', 'last_name': 'Петров',
                          'email': 'alex@mail.ru'}

        self.data_project = {'name': 'Тестовый проект', 'link_repository': 'https://github.com/shirguin'}
        self.data_project_put = {'name': 'Исправленный тестовый проект', 'link_repository': 'https://github.com/test'}
        self.url_project = '/projects/'

# APIRequestFactory
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data_user, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data_user, format='json')
        force_authenticate(request, self.admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

# APIClient
    def test_get_detail(self):
        user = User.objects.create(**self.data_user)
        client = APIClient()
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_project(self):
        user = User.objects.create(**self.data_user)
        client = APIClient()
        response = client.put(f'{self.url}{user.id}/', self.data_user_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_admin(self):
        user = User.objects.create(**self.data_user)
        client = APIClient()
        client.login(username=self.name, password=self.password)

        response = client.put(f'{self.url}{user.id}/', self.data_user_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user = User.objects.get(id=user.id)
        self.assertEqual(user.username, 'Petr')
        self.assertEqual(user.first_name, 'Петр')
        self.assertEqual(user.last_name, 'Петров')

        client.logout()


# APISimpleTestCase
class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        self.assertEqual(math.sqrt(4), 2)

# APITestCase
# Остановился здесь!!!

