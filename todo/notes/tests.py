import json
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
        self.password = '1234'
        self.email = 'admin@yandex.ru'
        self.url = 'users'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)
        self.data = {'username': 'Alex', 'first_name': 'Алексей', 'last_name': 'Ширгин', 'email': 'alex@mail.ru'}

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_create_admin(self):
    #     factory = APIRequestFactory()
    #     request = factory.post(self.url, self.data, format='json')
    #     force_authenticate(request,self.admin)
    #     view = AuthorModelViewSet.as_view({'post':'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code,status.HTTP_201_CREATED)
